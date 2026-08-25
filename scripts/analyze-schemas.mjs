#!/usr/bin/env node
// Deep-dive: find per-method payload schema keys and event subscriptions in a preload/renderer bundle.
import fs from "node:fs";

const file = process.argv[2];
const s = fs.readFileSync(file, "utf8");

// schema objects: m({key:{type:{...}...},...}) — capture top-level keys
const schemas = [...s.matchAll(/([A-Za-z_$][\w$]*)=m\(\{([^{}]*)\}\)/g)];
console.log(`== ${file}: ${schemas.length} flat schema tables`);
for (const [, name, body] of schemas.slice(0, 200)) {
  const keys = [...body.matchAll(/([A-Za-z_$][\w$]*):\{/g)].map((x) => x[1]);
  console.log(`  ${name}: ${keys.join(", ")}`);
}

// nested schema tables m({a:m({...}), b:h?...}) — find identifiers followed by =m({ then capture until balanced
let depth = 0, start = -1, count = 0;
for (let i = 0; i < s.length; i++) {
  const c = s[i];
  if (c === "{") { if (depth === 0) start = i; depth++; }
  else if (c === "}") {
    depth--;
    if (depth === 0 && start >= 0) {
      const chunk = s.slice(start, i + 1);
      // top-level keys of this object literal when passed to m(...)
      const before = s.slice(Math.max(0, start - 3), start);
      if (/=m\($/.test(before)) {
        const keys = [...chunk.matchAll(/(?:^|[,{])([A-Za-z_$][\w$]*):/g)].map((x) => x[1]);
        if (count < 40) console.log(`nested-schema#${count}: ${keys.join(", ")}`);
        count++;
      }
      start = -1;
    }
  }
}

// event names: strings passed where subscribe is called or on("dune-rpc:edge:e:NAME")
const evts = [...s.matchAll(/dune-rpc:[^:]+:e:([^"']+)/g)].map((x) => x[1]);
console.log("\n== wire channel event names:", [...new Set(evts)]);
