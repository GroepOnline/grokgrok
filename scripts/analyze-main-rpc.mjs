#!/usr/bin/env node
// Extract main-edge RPC handler tables from electron-main/main.cjs.
// Handlers are grouped as ma("<group>", { method: ({payloadKeys}) => ... , ... })
// Output -> evidence/generated/main-rpc-handlers.json
import fs from "node:fs";

const file = process.argv[2];
const s = fs.readFileSync(file, "utf8");

function balanced(src, openIdx) {
  let d = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === "{" || src[i] === "(") d++;
    else if (src[i] === "}" || src[i] === ")") { d--; if (d === 0) return i; }
  }
  return -1;
}

// find every `ma("<group>",{ ... })` — but ma may be minified differently per build;
// detect the helper name from first occurrence pattern: X("appWindow",{
const anchor = s.indexOf('"appWindow",{');
if (anchor < 0) { console.error("anchor not found"); process.exit(1); }
// walk back to the call start: identifier before '('
let callStart = s.lastIndexOf("(", anchor);
let nameStart = callStart - 1;
while (/[\w$]/.test(s[nameStart])) nameStart--;
const helper = s.slice(nameStart + 1, callStart);
console.error(`helper: ${helper}`);

const groups = [];
let idx = 0;
while (true) {
  const m = s.indexOf(`${helper}("`, idx);
  if (m < 0) break;
  const qEnd = s.indexOf('"', m + helper.length + 2);
  const group = s.slice(m + helper.length + 2, qEnd);
  // next arg must be {
  let j = qEnd + 1;
  while (s[j] === " ") j++;
  if (s[j] !== ",") { idx = m + 1; continue; }
  j++;
  while (s[j] === " ") j++;
  if (s[j] !== "{") { idx = m + 1; continue; }
  const end = balanced(s, j); // closes the object
  groups.push({ group, table: s.slice(j, end + 1), end });
  idx = end;
}

// split table entries on top-level commas (depth relative to table braces)
function splitEntries(table) {
  const out = [];
  let d = 0, start = 1;
  for (let i = 0; i < table.length; i++) {
    const c = table[i];
    if ("({[".includes(c)) d++;
    else if (")}]".includes(c)) d--;
    else if (c === "," && d === 1) { out.push(table.slice(start, i)); start = i + 1; }
  }
  out.push(table.slice(start, table.length - 1));
  return out;
}

const handlers = [];
for (const { group, table } of groups) {
  for (const chunk of splitEntries(table)) {
    const m = chunk.match(/^\s*([A-Za-z_$][\w$]*):([\s\S]*)$/);
    if (!m) continue;
    const name = m[1];
    const rest = m[2];
    // param shape: () => | (single) => | ({key[:alias], …}) =>
    const pm = rest.match(/^(\s*)\((\s*\{[^}]*\}\s*|[^)]{0,60}?)\)\s*=>/);
    let payloadKeys = [];
    const keyAliases = {}; // key -> local var name
    if (pm && /\{/.test(pm[2])) {
      for (const km of pm[2].matchAll(/([A-Za-z_$][\w$]*)\s*(?::\s*([A-Za-z_$][\w$]*))?\s*[,}]/g)) {
        payloadKeys.push(km[1]);
        keyAliases[km[1]] = km[2] ?? km[1];
      }
    }
    const takesObjectPayload = !!(pm && /\{/.test(pm[2]));

    // type evidence from handler body usage of each aliased key
    const body = rest.slice(rest.indexOf(">") + 1, rest.length); // after first '=>' — bounded heuristic on minified arrow
    const fieldTypes = {};
    for (const [key, v] of Object.entries(keyAliases)) {
      const esc = v.replace(/[$]/g, "\\$");
      let type = null;
      let nullable = false;
      const eq = "={2,3}"; // minifier emits both == and ===
      if (new RegExp(`typeof\\s${esc}\\s*${eq}"string"`).test(body)) type = "string";
      else if (new RegExp(`typeof\\s${esc}\\s*${eq}"number"`).test(body)) type = "number";
      else if (new RegExp(`typeof\\s${esc}\\s*${eq}"boolean"`).test(body)) type = "boolean";
      else if (new RegExp(`Array\\.isArray\\(${esc}\\)`).test(body)) type = "array";
      else if (new RegExp(`${esc}\\.map\\(`).test(body)) type = "array";
      else if (new RegExp(`\\b${esc}${eq}!0`).test(body)) type = "boolean"; // minified true
      else if (new RegExp(`typeof\\s${esc}\\s*!{1,2}="string"|\\w+\\.test\\(${esc}\\)|${esc}\\.trim\\(`).test(body)) type = "string";
      else if (new RegExp(`typeof\\s${esc}\\s*!{1,2}="number"|Number\\.isFinite\\(${esc}\\)`).test(body)) type = "number";
      if (type === null && new RegExp(`typeof\\s${esc}\\s*${eq}"object"`).test(body)) type = "object";
      if (!nullable && new RegExp(`\\b${esc}{2}null|\\b${esc}!{1,2}=null|${esc}\\?\\?null`.replaceAll("{2}", eq)).test(body)) nullable = true;
      if (type || nullable) fieldTypes[key] = { ...(type ? { type } : {}), ...(nullable ? { nullable } : {}) };
    }

    // return-shape evidence: arrow/return object literals without nested braces
    const returnKeys = {};
    for (const rm of rest.matchAll(/(?:=>\s*\(|\breturn\s*)\{([^{}]{0,400}?)\}/g)) {
      const lit = rm[1];
      // top-level commas only
      let d = 0, parts = [], cur = "";
      for (const ch of lit) {
        if (ch === "(" || ch === "[") d++;
        else if (ch === ")" || ch === "]") d--;
        if (ch === "," && d === 0) { parts.push(cur); cur = ""; } else cur += ch;
      }
      parts.push(cur);
      for (const part of parts) {
        const kv = part.match(/^\s*([A-Za-z_$][\w$]*)\s*:\s*([\s\S]{0,120})$/);
        if (!kv || /^(if|for|while|switch)$/.test(kv[1])) continue;
        const val = kv[2];
        returnKeys[kv[1]] = {
          ...( /\?\?\s*null|\|\|\s*null|:\s*null[,}]?$/.test(val) ? { nullable: true } : {} ),
        };
      }
    }
    // human-readable constraint strings from assertions inside the handler
    const messages = [...rest.matchAll(/\"([^\"\\]{15,140})\"/g)].map((x) => x[1])
      .filter((t) => !/[&<>\\]/.test(t) && /^[A-Za-z][^.]*[.!?]$/.test(t) && (t.match(/[A-Za-z]{2,}/g) || []).length >= 4);

    handlers.push({ group, method: name, payloadKeys, takesObjectPayload,
      ...(Object.keys(fieldTypes).length ? { fieldTypes } : {}),
      ...(Object.keys(returnKeys).length ? { returnKeys } : {}),
      ...(messages.length ? { messages: messages.slice(0, 4) } : {}) });
  }
}

console.log(JSON.stringify({ schema: "grokgrok/main-rpc-handlers@1", count: handlers.length, handlers }, null, 2));
