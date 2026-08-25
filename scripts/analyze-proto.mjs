#!/usr/bin/env node
// Protobuf atlas recovery from dist/host/host-main.cjs (protobufjs static-generated classes).
// Recovers: namespaces, messages (fields w/ numbers, wire types, repetition), enums,
// services + rpc methods. Structural facts only (names/numbers/types); no serialization code.
// Output -> evidence/generated/proto-atlas.json (gitignored)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles", "host-main.cjs");
const OUT = path.join(REPO, "evidence", "generated", "proto-atlas.json");

if (!fs.existsSync(HOST)) {
  console.error("host-main.cjs missing — run npm run ingest first");
  process.exit(1);
}
const src = fs.readFileSync(HOST, "utf8");

function balancedClose(i) {
  let d = 0;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (c === "(") d++;
    else if (c === ")") { d--; if (d === 0) return j; }
  }
  return -1;
}

const messages = [];
const enums = [];
const services = [];
let unresolvedFields = [];

function kindOf(body) {
  const head = body.slice(0, 200);
  if (/=\{\};return/.test(head)) return "namespace";
  if (/rpc\.Service/.test(head)) return "service";
  if (/Object\.create\(/.test(body.slice(0, 400))) return "enum";
  return "message";
}

function parseEntries(pos, scopeEnd, nsPath) {
  // LHS may be dotted for nested types (o.Event=(function…)
  const entryRe = /\b([\w$]+(?:\.[\w$]+)*)=\(function/g;
  entryRe.lastIndex = pos;
  let m;
  while ((m = entryRe.exec(src)) && m.index < scopeEnd) {
    const parts = m[1].split(".");
    const name = parts[parts.length - 1];
    const openParen = m.index + m[0].indexOf("(");
    const close = balancedClose(openParen);
    if (close < 0 || close > scopeEnd) break;
    const innerStart = src.indexOf("{", openParen) + 1;
    const body = src.slice(innerStart, close);
    const kind = kindOf(body);
    const fullName = [...nsPath, name].join(".");
    if (kind === "enum") enums.push(parseEnum(fullName, body));
    else if (kind === "service") services.push(parseService(fullName, body));
    else if (kind === "message") messages.push(parseMessage(fullName, body));
    // recurse into every entry body — namespaces nest, and message bodies
    // can carry nested types (Span.Event, Span.Link)
    parseEntries(innerStart, close, [...nsPath, name]);
    entryRe.lastIndex = close;
  }
}

function parseEnum(name, body) {
  const values = [];
  for (const v of body.matchAll(/\w\[\w\[(\d+)\]="(\w+)"\]=\d+/g)) {
    values.push({ name: v[2], number: Number(v[1]) });
  }
  return { kind: "enum", fullName: name, values };
}

function short(ref) {
  return ref.replace(/^re\.opentelemetry\.proto\./, "");
}

function parseService(name, body) {
  const methods = [];
  for (const mm of body.matchAll(
    /prototype\.(\w+)=function \w+\(\w+,(\w+)\)\{return this\.rpcCall\(\w+,([\w.$]+),([\w.$]+),\w+,\2\)/g,
  )) {
    methods.push({ id: mm[1], inputType: short(mm[3]), outputType: short(mm[4]) });
  }
  // bind display names ("Export") to ids in declaration order
  const names = [...body.matchAll(/value:"(\w+)"/g)].map((x) => x[1]);
  names.forEach((n, i) => { if (methods[i]) { methods[i].name = n; delete methods[i].id; } });
  return { kind: "service", fullName: name, methods };
}

const SCALARS = new Set(["string","bool","int64","uint64","int32","uint32","double","float","bytes","fixed64","sfixed64","fixed32","sfixed32","sint32","sint64"]);

function parseMessage(name, body) {
  const fields = [];
  const seen = new Map();
  const addField = (f) => {
    if (!seen.has(f.name)) { seen.set(f.name, f); fields.push(f); }
    else Object.assign(seen.get(f.name), f);
    f.wireType = f.number & 7;
  };
  const dec = body.match(/decode=function\([\s\S]{0,600}?switch\((\w)>>>3\)\{([\s\S]*?)default:\w\.skipType/);
  // (fieldNumber, statement) pairs from either switch cases or ternary chains
  const stmts = dec
    ? [...dec[2].matchAll(/case (\d+):\{(.*?)break\}/gs)].map((c) => [Number(c[1]), c[2]])
    : [...body.matchAll(/\w+>>>3===(\d+)\?(?:\(([\s\S]{0,300}?)\)|(\w+\.\w+=(?:(?!:\w+\.skipType).)*)):\w+\.skipType/g)]
        .map((c) => [Number(c[1]), (c[2] ?? c[3]) + ","]);
  if (!stmts.length) {
    unresolvedFields.push({ message: name, fieldNumber: null, snippet: "decode not located" });
  }
  for (const [num, stmt] of stmts) {
      // minifier renames vars; match structurally, not by name
      const repMsg = stmt.match(/(\w+)\.(\w+)&&\1\.\2\.length\|\|\(\1\.\2=\[\]\),\1\.\2\.push\(([\w.$]+)\.decode\((\w+),\4\.uint32\(\)\)\)/);
      const repScalar = stmt.match(/(\w+)\.(\w+)&&\1\.\2\.length\|\|\(\1\.\2=\[\]\),\1\.\2\.push\((\w+)\.(\w+)\(\)\)/);
      const singMsg = stmt.match(/\w+\.(\w+)=([\w.$]+)\.decode\((\w+),\3\.uint32\(\)\)/);
      const singScalar = stmt.match(/\w+\.(\w+)=(\w+)\.(\w+)\(\)/);
      if (repMsg) addField({ name: repMsg[2], number: num, type: short(repMsg[3]), repeated: true });
      else if (repScalar && SCALARS.has(repScalar[4])) addField({ name: repScalar[2], number: num, type: repScalar[4], repeated: true });
      else if (singMsg) addField({ name: singMsg[1], number: num, type: short(singMsg[2]), repeated: false });
      else if (singScalar && SCALARS.has(singScalar[3])) addField({ name: singScalar[1], number: num, type: singScalar[3], repeated: false });
      else {
        const packed = stmt.match(/(\w+)\.(\w+)&&\1\.\2\.length\|\|\(\1\.\2=\[\]\),\(\w+&7\)===2\)for\(var \w+=0;\w+<\1\.\2\.length;\+\+\w+\)\1\.\2\[\w+\]=(\w+)\.(\w+)\(\)/);
        const packedAlt = stmt.match(/(\w+)\.(\w+)&&\1\.\2\.length\|\|\(\1\.\2=\[\]\),\(\w+&7\)===2\)for\(var \w+=\w+\.uint32\(\)\+\w+\.pos;\w+\.pos<\w+;\)\1\.\2\.push\(\w+\.(\w+)\(\)\);else \1\.\2\.push\(\w+\.\3\(\)\)/);
        if (packed && SCALARS.has(packed[4])) addField({ name: packed[2], number: num, type: packed[4], repeated: true });
        else if (packedAlt && SCALARS.has(packedAlt[3])) addField({ name: packedAlt[2], number: num, type: packedAlt[3], repeated: true });
        else unresolvedFields.push({ message: name, fieldNumber: num, snippet: stmt.slice(0, 80) });
      }
  }
  // oneofs
  const oneofs = [];
  for (const oo of body.matchAll(/oneOfGetter\(\w+=\[(.*?)\]\)/g)) {
    oneofs.push([...oo[1].matchAll(/"(\w+)"/g)].map((x) => x[1]));
  }
  const tu = body.match(/getTypeUrl=function\(\w\)\{return \w===void 0&&\(\w="[^"]*"\),\w+\+"([^"]+)"/);
  return {
    kind: "message", fullName: name, fields,
    ...(oneofs.length ? { oneofs } : {}),
    ...(tu ? { typeUrl: tu[1] } : {}),
  };
}

const rootRe = /\w+\.opentelemetry=\(function\(\)\{var \w+=\{\};return/;
const rm = rootRe.exec(src);
if (!rm) { console.error("protobuf root not found"); process.exit(1); }
const rootOpen = rm.index + "X.opentelemetry=".length + 1;
const rootClose = balancedClose(rootOpen);
parseEntries(src.indexOf("{", rootOpen) + 1, rootClose, []);

// resolve message-type refs
const typeNames = new Set([
  ...messages.map((x) => x.fullName),
  ...enums.map((x) => x.fullName),
]);
for (const msg of messages) {
  for (const f of msg.fields) {
    if (SCALARS.has(f.type)) continue;
    const full = "proto." + f.type; // full names are rooted at the .opentelemetry namespace
    if (typeNames.has(full)) { f.resolvedType = full; }
    else f.unresolvedRef = f.type;
  }
}

const atlas = {
  schema: "grokgrok/proto-atlas@1",
  sourceBundle: "dist/host/host-main.cjs",
  extractionMethod: "protobufjs static-class structure walk (balanced-paren scope parser)",
  generatedAt: new Date().toISOString(),
  counts: {
    messages: messages.length,
    enums: enums.length,
    services: services.length,
    serviceMethods: services.reduce((a, s) => a + s.methods.length, 0),
    fields: messages.reduce((a, m) => a + m.fields.length, 0),
    unresolvedFields: unresolvedFields.length,
  },
  packages: [...new Set(messages.concat(enums).map((m) => m.fullName.split(".").slice(0, -1).join(".")))],
  messages,
  enums,
  services,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(atlas, null, 2));
console.log(JSON.stringify(atlas.counts));

// ---- clean-room TypeScript structural interfaces ----
const tsName = (full) => full.replace(/\./g, "_");
const SCALAR_TS = { string:"string", bool:"boolean", double:"number", float:"number",
  int64:"string|number|bigint", uint64:"string|number|bigint", sint64:"string|number|bigint",
  fixed64:"string|number|bigint", sfixed64:"string|number|bigint" };
function fieldTs(f) {
  let t;
  if (SCALARS.has(f.type)) t = SCALAR_TS[f.type] ?? "number"; // int32/uint32/… fit in number
  else if (f.resolvedType) t = tsName(f.resolvedType);
  else t = f.type.split(".").pop(); // nested relative ref, resolved below by suffix match
  if (f.repeated) t = `Array<${t}>`;
  return t + (f.type.endsWith("int64") && !f.repeated ? "" : "");
}
let ts = `// GENERATED clean-room structural interfaces from Grok Bot 0.24.0 shipped host bundle.
// Regenerate: node scripts/analyze-proto.mjs — do not hand-edit.
// Wire-format structure only (field names, numbers, types); no serialization logic.

`;
for (const e of enums.sort((a,b)=>a.fullName.localeCompare(b.fullName))) {
  ts += `export const ${tsName(e.fullName)} = {
${e.values.map(v=>`  ${v.name}: ${v.number},`).join("\n")}
} as const;
export type ${tsName(e.fullName)} = (typeof ${tsName(e.fullName)})[keyof typeof ${tsName(e.fullName)}];

`;
}
for (const m of messages.sort((a,b)=>a.fullName.localeCompare(b.fullName))) {
  const oneofNames = new Set((m.oneofs ?? []).flat());
  const lines = m.fields.map(f => `  readonly ${f.name}${oneofNames.has(f.name)?"?":""}: ${fieldTs(f)};`);
  if (m.oneofs?.length) lines.push(`  /** oneof value */\n  readonly value?: ${m.oneofs[0].map(x=>JSON.stringify(x)).join(" | ")};`);
  ts += `export interface ${tsName(m.fullName)} {
${lines.join("\n")}
}

`;
}
for (const s of services.sort((a,b)=>a.fullName.localeCompare(b.fullName))) {
  ts += `export interface ${tsName(s.fullName)} {
${s.methods.map(mm=>`  ${mm.name}: { input: ${tsName("proto."+mm.inputType)}; output: ${tsName("proto."+mm.outputType)} };`).join("\n")}
}

`;
}
fs.writeFileSync(path.join(REPO, "src", "wire", "otel-proto.generated.ts"), ts);
console.error(`wrote src/wire/otel-proto.generated.ts (${messages.length+enums.length+services.length} declarations)`);
if (unresolvedFields.length) console.error("UNRESOLVED:", JSON.stringify(unresolvedFields, null, 1).slice(0, 2000));
