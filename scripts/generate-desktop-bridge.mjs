#!/usr/bin/env node
// Generate clean-room TypeScript desktop-bridge surface from shipped-bundle evidence.
// Inputs:  .cache/artifact/0.24.0/bundles/{preload.cjs? -> use asar}, electron-main.cjs
// Output:  src/wire/desktop-bridge.generated.ts
// Evidence: preload arg-style table (_Mn), main handler payload destructures (FGn/ma groups),
//           main->renderer emit() domain events.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(REPO, ".cache", "artifact", "0.24.0");
const BUNDLES = path.join(CACHE, "bundles");
const PRELOAD = path.join(BUNDLES, "preload.cjs");

if (!fs.existsSync(PRELOAD)) {
  execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", "dist/electron-preload/preload.cjs", PRELOAD], { stdio: "inherit" });
}

// 1. arg styles from preload table
const preload = fs.readFileSync(PRELOAD, "utf8");
const tm = preload.match(/=\w+\("main","events"\),\w+=\{([\s\S]*?)\};/);
if (!tm) { console.error("preload table not found"); process.exit(1); }
const argStyles = {};
for (const m of tm[1].matchAll(/([A-Za-z_$][\w$]*):\{args:"([^"]+)"\}/g)) argStyles[m[1]] = m[2];
console.error(`preload methods: ${Object.keys(argStyles).length}`);

// 2. payload keys from handlers
execFileSync("node", [path.join(REPO, "scripts", "analyze-main-rpc.mjs"), path.join(BUNDLES, "electron-main.cjs")],
  { stdio: ["ignore", fs.openSync(path.join(CACHE, "main-rpc-handlers.json"), "w"), "inherit"] });
const h = JSON.parse(fs.readFileSync(path.join(CACHE, "main-rpc-handlers.json"), "utf8"));
const payloadKeys = {};
const fieldTypes = {};
const returnKeys = {};
const constraints = {};
for (const e of h.handlers) {
  if (e.takesObjectPayload) payloadKeys[e.method] = e.payloadKeys;
  if (e.fieldTypes) fieldTypes[e.method] = e.fieldTypes;
  if (e.returnKeys) returnKeys[e.method] = e.returnKeys;
  if (e.messages) constraints[e.method] = e.messages;
}

// 3. domain events (curated filter of emit("...") names against EventEmitter internals)
const main = fs.readFileSync(path.join(BUNDLES, "electron-main.cjs"), "utf8");
const NODE_STD_EVENTS = new Set(["abort","afterCaptureLog","afterSendEvent","applyFrameMetadata","beforeAddBreadcrumb","beforeCaptureLog","beforeEnvelope","beforeSampling","beforeSendEvent","beforeSendSession","change","close","complete","conclude","connect","connectionError","createDsc","data","drain","end","entry","error","field","finish","flush","flushLogs","focus-agent-x","header","headers","info","limit","message","metadata","missing","open","parsed","part","partsLimit","ping","pong","postprocessEvent","prefinish","preprocessEvent","readable","redirect","resume","setup","spanEnd","spanStart","stat","terminated","trailer","unexpected-response","upgrade","warn","wsClientError"]);
const domainEvents = [...new Set([...main.matchAll(/emit\("([a-zA-Z][a-zA-Z0-9_-]+)"/g)].map((m) => m[1]))]
  .filter((n) => !NODE_STD_EVENTS.has(n)).sort();

// 4. emit TS
const pascal = (s) => s[0].toUpperCase() + s.slice(1).replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
let ts = `// GENERATED from Grok Bot 0.24.0 shipped bundles — do not hand-edit.
// Regenerate: npm run gen:desktop-bridge
// Evidence: dist/electron-preload/preload.cjs (arg styles, ${Object.keys(argStyles).length} methods)
//           dist/electron-main/main.cjs FGn/ma handler tables (payload keys)
// Clean-room interface reconstruction: method names, arg style, and destructured
// payload keys are artifact-proven; value types are unknown unless noted.

export type ArgsStyle = "none" | "object";

export interface RpcMethodInfo {
  readonly args: ArgsStyle;
  /** Destructured payload keys proven in the main-process handler, if any. */
  readonly payloadKeys?: readonly string[];
}

export const MAIN_EDGE = "main" as const;

export const MAIN_RPC_METHODS = {
`;
for (const [name, args] of Object.entries(argStyles)) {
  const keys = payloadKeys[name];
  ts += `  ${name}: { args: "${args}"${keys ? `, payloadKeys: [${keys.map((k) => JSON.stringify(k)).join(", ")}]` : ""} },\n`;
}
ts += `} as const satisfies Record<string, RpcMethodInfo>;

export type MainRpcMethod = keyof typeof MAIN_RPC_METHODS;

/** Main->renderer broadcast event names recovered from electron-main.cjs emit() sites. */
export const MAIN_RPC_EVENTS = [
${domainEvents.map((e) => `  ${JSON.stringify(e)},`).join("\n")}
] as const;

export type MainRpcEvent = (typeof MAIN_RPC_EVENTS)[number];

/** Payload shapes for methods whose object keys are artifact-proven (destructured in main handlers). */
type ProvenType = "string" | "number" | "boolean" | "array" | "object" | unknown;
export interface ProvenPayloads {
`;
const tsType = (f) => {
  const base = f.type === "array" ? "unknown[]" : f.type ?? "unknown";
  return `${base}${f.nullable ? " | null" : ""}`;
};
for (const [name, keys] of Object.entries(payloadKeys)) {
  const ft = fieldTypes[name] ?? {};
  ts += `  ${name}: { ${keys.map((k) => `readonly ${k}: ${ft[k] ? tsType(ft[k]) : "/* unresolved */ unknown"}`).join("; ")} };
`;
}
ts += `}

/** Return-object shapes proven from handler bodies (arrow/return literals). */
export interface ProvenReturns {
`;
for (const [name, ret] of Object.entries(returnKeys)) {
  ts += `  ${name}: { ${Object.entries(ret).map(([k, v]) => `readonly ${k}: unknown${v.nullable ? " | null" : ""}`).join("; ")} };
`;
}
ts += `}

/** Human-readable constraint strings recovered from main-process assertions. */
export const MAIN_RPC_CONSTRAINTS = {
`;
for (const [name, msgs] of Object.entries(constraints)) {
  ts += `  ${name}: [
${msgs.map((m) => `    ${JSON.stringify(m)},`).join("\n")}
  ],
`;
}
ts += `} as const;`;

fs.mkdirSync

fs.mkdirSync(path.join(REPO, "src", "wire"), { recursive: true });
fs.writeFileSync(path.join(REPO, "src", "wire", "desktop-bridge.generated.ts"), ts);
console.error(`wrote src/wire/desktop-bridge.generated.ts (${Object.keys(argStyles).length} methods, ${domainEvents.length} events)`);
