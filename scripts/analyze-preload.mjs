#!/usr/bin/env node
// Analyze shipped preload.cjs: enumerate RPC edges, methods, arg styles, event names.
// Usage: node scripts/analyze-preload.mjs [path-to-preload.cjs]
import fs from "node:fs";

const file = process.argv[2] ?? "/tmp/preload.cjs";
const s = fs.readFileSync(file, "utf8");

const edges = [...s.matchAll(/R\("([a-z-]+)",\s*"([^"]*)"\)/g)].map((m) => ({ edge: m[1], events: m[2] }));
console.log("EDGES:", JSON.stringify(edges));

// Method tables follow pattern: edgeVar={method:{args:"object"|"none"|...},...}
for (const e of edges) {
  // find `var X=R("edge",...` then the table assigned like ,Y={...}
  const re = new RegExp(`R\\("${e.edge}"[^)]*\\),\\s*([A-Za-z_$][\\w$]*)=\\{(.*?)\\};`, "s");
  const m = s.match(re);
  if (!m) { console.log(`\n== ${e.edge}: no inline table`); continue; }
  const body = m[2];
  const methods = [...body.matchAll(/([A-Za-z_$][\w$]*):\{args:"([^"]+)"\}/g)].map((x) => `${x[1]}(${x[2]})`);
  console.log(`\n== ${e.edge} (${methods.length} methods)`);
  for (const x of methods) console.log("  ", x);
}

// exposed bindings at end
console.log("\n== contextBridge exposures:");
for (const m of s.matchAll(/exposeInMainWorld\("([^"]+)",/g)) console.log("  ", m[1]);
