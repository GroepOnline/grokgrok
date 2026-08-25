#!/usr/bin/env node
// Version-diff hook: compare generated atlases across artifact versions so a
// future ingest (e.g. 0.25.x) can emit a machine-readable subsystem delta.
// Usage: node scripts/diff-version.mjs <old-generated-dir> [new-generated-dir]
//        (new defaults to the repo's evidence/generated)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const oldDir = path.resolve(process.argv[2] ?? "");
const newDir = path.resolve(process.argv[3] ?? path.join(REPO, "evidence", "generated"));
if (!oldDir || !fs.existsSync(oldDir)) {
  console.error("usage: node scripts/diff-version.mjs <old-generated-dir> [new-generated-dir]");
  process.exit(1);
}
const load = (dir, f) => fs.existsSync(path.join(dir, f)) ? JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) : null;
const setDiff = (a, b) => ({ added: [...b].filter((x) => !a.has(x)).sort(), removed: [...a].filter((x) => !b.has(x)).sort() });

const oldS = load(oldDir, "services-atlas.json"), newS = load(newDir, "services-atlas.json");
const oldG = load(oldDir, "feature-gates.json"), newG = load(newDir, "feature-gates.json");
const oldN = load(oldDir, "native-abi.json"), newN = load(newDir, "native-abi.json");

const serviceMethods = (atlas) => {
  const m = new Map();
  for (const s of atlas?.services ?? []) {
    for (const [k, v] of Object.entries(s.methods)) m.set(`${s.service}.${k}`, v.kind);
  }
  return m;
};

const out = { schema: "grokgrok/version-diff@1" };
if (oldS && newS) {
  const om = serviceMethods(oldS), nm = serviceMethods(newS);
  out.services = {
    ...setDiff(new Set(om.keys()), new Set(nm.keys())),
    kindChanged: [...nm].filter(([k, v]) => om.has(k) && om.get(k) !== v).map(([k]) => k).sort(),
  };
}
if (oldG && newG) {
  out.featureGates = {
    knobs: setDiff(
      new Set(Object.values(oldG.groups ?? {}).flat()),
      new Set(Object.values(newG.groups ?? {}).flat()),
    ),
    enumMembers: setDiff(new Set(oldG.enumMembers ?? []), new Set(newG.enumMembers ?? [])),
  };
}
if (oldN && newN) {
  out.nativeModules = setDiff(
    new Set((oldN.modules ?? []).map((m) => m.file)),
    new Set((newN.modules ?? []).map((m) => m.file)),
  );
}
console.log(JSON.stringify(out, null, 2));
