#!/usr/bin/env node
// Deterministic validator: re-derive the main-RPC surface from the cached artifact
// and diff it against the committed src/wire/desktop-bridge.generated.ts.
// Exit 1 on any drift. Requires `npm run ingest` (and bundle extraction) to have run.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(REPO, ".cache", "artifact", "0.24.0");
const BUNDLES = path.join(CACHE, "bundles");
const PRELOAD = path.join(BUNDLES, "preload.cjs");
const MAIN = path.join(BUNDLES, "electron-main.cjs");
let failed = 0;
const fail = (msg) => { console.error("FAIL:", msg); failed++; };

for (const f of [PRELOAD, MAIN]) {
  if (!fs.existsSync(f)) {
    console.error(`missing ${f}; run npm run ingest first`);
    process.exit(2);
  }
}

// regenerate in-memory by running the generator with output captured
const genPath = path.join(REPO, "src", "wire", "desktop-bridge.generated.ts");
const before = fs.existsSync(genPath) ? fs.readFileSync(genPath, "utf8") : null;
fs.mkdirSync(path.join(REPO, "src", "wire"), { recursive: true });
execFileSync("node", [path.join(REPO, "scripts", "generate-desktop-bridge.mjs")], { stdio: "inherit" });
const after = fs.readFileSync(genPath, "utf8");
if (before !== null && before !== after) fail("desktop-bridge.generated.ts is stale — run npm run gen:desktop-bridge");
else if (before === null) console.error("generated file was missing; created");

// hard invariants
const methodCount = [...after.matchAll(/^  [a-zA-Z_$][\w$]*: \{/gm)].length;
if (methodCount !== 145) fail(`expected 145 main-edge methods, generated ${methodCount}`);
else console.error(`ok: 145 methods`);

if (!/export const MAIN_RPC_EVENTS/.test(after)) fail("events list missing");

// ingest provenance gate
const ingest = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
if (!ingest.artifact.sha256MatchesExpected) fail("artifact sha mismatch");
else if (ingest.artifact.version !== "0.24.0") fail(`unexpected artifact version ${ingest.artifact.version}`);
else console.error(`ok: artifact 0.24.0 sha256 verified`);

// no absolute machine paths in committed sources
const offenders = [];
for (const dir of ["scripts", "src"]) {
  for (const e of fs.globSync(`${dir}/**`)) {
    if (!/\.(mjs|ts|json)$/.test(e) || fs.statSync(e).isDirectory()) continue;
    const text = fs.readFileSync(e, "utf8");
    if (/\/home\/|\/mnt\/|\/Users\//.test(text.replace(/https?:\/\/[^\s"']*/g, ""))) offenders.push(e);
  }
}
if (offenders.length) fail(`absolute machine paths in: ${offenders.join(", ")}`);
else console.error("ok: no absolute machine paths");

console.error(failed ? `${failed} check(s) failed` : "all validators green");
process.exit(failed ? 1 : 0);
