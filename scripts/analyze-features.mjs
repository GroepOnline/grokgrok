#!/usr/bin/env node
// Feature gate / dynamic-config registry recovery from shipped bundles.
// Sources: `.checkGate("<name>")` call sites + zod-typed dynamic-config registries
// (object literals of `<key>:y.object({...})` shapes). Structural evidence only;
// presence in the client does NOT mean the flag is enabled remotely.
// Output -> evidence/generated/feature-registry.json (gitignored)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");
const OUT = path.join(REPO, "evidence", "generated", "feature-registry.json");

const BUNDLE_LIST = ["host-main.cjs", "electron-main.cjs", "main.cjs", "coordinator-main.cjs"];

/** balanced scan for ')' / '}' starting at i where depth counts one bracket type */
function balanced(src, i, open, close) {
  let d = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === open) d++;
    else if (src[j] === close) { d--; if (d === 0) return j; }
  }
  return -1;
}

const gates = {};   // name -> [{bundle, context}]
const configs = {}; // key -> { shape, bundles: [] }
const experiments = new Set();

for (const bundle of BUNDLE_LIST) {
  const p = path.join(BUNDLES, bundle);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, "utf8");

  for (const m of src.matchAll(/\.checkGate\s*\(\s*"([^"]+)"/g)) {
    (gates[m[1]] ||= []).push({ bundle });
  }

  // dynamic-config registries: object literal with many `key:y.object({…})` entries
    // property start only: preceded by "{" or "," — avoids matching mid-identifier
  const entryRe = /[{,]\s*([a-z_][a-z0-9_]{2,64}):y\.object\(/g;
  let m;
  while ((m = entryRe.exec(src))) {
    const key = m[1];
    if (!key.includes("_")) continue;
    // skip nested y.object(...) entries entirely: jump past this call's parens
    const callParen = m.index + m[0].length - 1;
    const callEnd = balanced(src, callParen, "(", ")");
    if (callEnd < 0) continue;
    entryRe.lastIndex = callEnd;
    const objStart = src.indexOf("{", callParen);
    const objEnd = balanced(src, objStart, "{", "}");
    if (objEnd < 0 || objEnd > callEnd) continue;
    const shapeSrc = src.slice(objStart + 1, objEnd);
    // only treat as config-schema when the object looks like a zod schema (all props are zod calls)
    const propCount = [...shapeSrc.matchAll(/[a-z_][a-z0-9_]*:/g)].length;
    if (!propCount || !/\by\.(string|boolean|number|enum|array|record|optional|nullish)/.test(shapeSrc.slice(0, 400))) continue;
    const fields = {};
    for (const f of shapeSrc.matchAll(/([a-z_][a-z0-9_]*):y\.(\w+)\(([^;)]{0,80})/g)) {
      let kind = f[2];
      const inner = f[3];
      let optional = false;
      // detect .optional()/.nullish() applied after this prop by peeking ahead
      const afterIdx = src.indexOf(f[1] + ":y." + kind, objStart);
      void afterIdx;
      optional = /\.optional\(\)|\.nullish\(\)/.test(inner);
      fields[f[1]] = { zod: kind + (inner && /\brecord\b|\barray\b/.test(kind) ? "" : ""), optional };
    }
    if (!configs[key]) configs[key] = { shape: fields, bundles: [] };
    if (!configs[key].bundles.includes(bundle)) configs[key].bundles.push(bundle);
    entryRe.lastIndex = objEnd;
  }
}

// classify: Grok Bot product keys vs shared Cursor/platform keys
function classify(key) {
  if (/^(sand|grok)_/.test(key)) return "grok-bot-product";
  return "shared-platform";
}
const classifiedConfigs = Object.fromEntries(
  Object.entries(configs).map(([k, v]) => [k, { ...v, class: classify(k) }]),
);

const result = {
  schema: "grokgrok/feature-registry@1",
  generatedAt: new Date().toISOString(),
  provenance: {
    method: "static extraction from shipped bundles (.checkGate call sites + zod schema registries)",
    caveat: "Presence proves bundling only — not remote enablement/assignment. Statsig-backed (featureassets.org).",
    bundlesScanned: BUNDLE_LIST,
  },
  counts: {
    gates: Object.keys(gates).length,
    dynamicConfigs: Object.keys(classifiedConfigs).length,
    grokBotProductKeys: Object.values(classifiedConfigs).filter((c) => c.class === "grok-bot-product").length,
    sharedPlatformKeys: Object.values(classifiedConfigs).filter((c) => c.class === "shared-platform").length,
  },
  gates,
  dynamicConfigs: Object.fromEntries(Object.entries(classifiedConfigs).sort(([a], [b]) => a.localeCompare(b))),
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result.counts));
