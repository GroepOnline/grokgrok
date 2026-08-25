#!/usr/bin/env node
// Extract node-agent-coordinator command/edge tables + frame protocol evidence.
// Output -> evidence/generated/coordinator-atlas.json
import fs from "node:fs";

const file = process.argv[2] ?? "/tmp/coordinator-main.cjs";
const s = fs.readFileSync(file, "utf8");

function balanced(src, openIdx) {
  let d = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === "{") d++;
    else if (src[i] === "}") { d--; if (d === 0) return i; }
  }
  return -1;
}

// edges declared like: Y("coordinator-control","events") / Y("coordinator-main")
const edges = [...s.matchAll(/=\w+\("([a-z-]+)"(?:,"events")?\)/g)].map((m) => m[1]);
const uniqueEdges = [...new Set(edges)];

// method tables: {name:{args:"none"|"object"[,reply:"..."]}, ...} of size >=3
const tables = [];
let idx = 0;
while (true) {
  const m = s.indexOf('{args:"', idx);
  if (m < 0) break;
  // walk back to the opening brace of the enclosing object literal (preceded by = or , or ()
  let open = m;
  while (open > 0) {
    open = s.lastIndexOf("{", open - 1);
    const before = s.slice(Math.max(0, open - 2), open).trimEnd();
    if (/[=(,]$/.test(before)) break;
  }
  if (open <= 0) { idx = m + 1; continue; }
  // ensure this looks like a method table (preceded by var X= or ,X= or ({)
  const end = balanced(s, open);
  const body = s.slice(open, end + 1);
  const entries = [...body.matchAll(/([A-Za-z_$][\w$]*):\{args:"(none|object)"(?:,reply:"([a-z-]+)")?\}/g)];
  if (entries.length >= 3) {
    tables.push([...new Map(entries.map((e) => [e[1], { args: e[2], ...(e[3] ? { reply: e[3] } : {}) }])).entries()]
      .map(([name, v]) => ({ name, ...v })));
  }
  idx = end > open ? end : m + 1;
}

// frame protocol
const frameKinds = [...new Set([...s.matchAll(/kind[=:]"([a-z-]+)"/g)].map((m) => m[1]))]
  .filter((k) => ["lifecycle","request","cancel","reply","event","hello","ready","welcome"].includes(k));
const lifecyclePhases = [...new Set([...s.matchAll(/phase:"([a-z-]+)"/g)].map((m) => m[1]))];

const env = [...new Set([...s.matchAll(/\b(SAND_[A-Z_]+)/g)].map((m) => m[1]))].sort();

console.log(JSON.stringify({
  schema: "grokgrok/coordinator-atlas@1",
  edges: uniqueEdges,
  channelConstants: [...new Set(["coordinator-transport-state","coordinator-control","coordinator-main-data"])],
  methodTables: tables,
  frameKinds,
  lifecyclePhases,
  envFlags: env,
  notes: [
    "frames carry {channel:'coordinator-control', frame:{...}} shapes",
    "hello handshake: provider sends kind:welcome(providerId); client replies kind:hello(computerId?,label?); phases hello/ready with numeric protocolVersion (=1 observed)",
    "VNC: websockify URL built from port_token|network_token",
  ],
}, null, 2));
