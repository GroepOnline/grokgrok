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
    const dm = rest.match(/\(\s*\{([^}]*)\}\s*[,)]/);
    const payloadKeys = dm ? [...dm[1].matchAll(/([A-Za-z_$][\w$]*)\s*[:=}]/g)].map((x) => x[1]) : [];
    handlers.push({ group, method: name, payloadKeys, takesObjectPayload: !!dm });
  }
}

console.log(JSON.stringify({ schema: "grokgrok/main-rpc-handlers@1", count: handlers.length, handlers }, null, 2));
