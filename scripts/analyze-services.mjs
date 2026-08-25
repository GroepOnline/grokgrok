#!/usr/bin/env node
// Deterministic protobuf-service atlas from shipped bundles.
// Mines `typeName:"<pkg>.<Service>",methods:{...}` tables (ConnectRPC/esbuild output)
// for every bundle and emits evidence/generated/services-atlas.json.
// Method entries look like name:{name:"X",I:<in>,O:<out>,kind:x.Unary|ServerStreaming|...}
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");

const services = [];
for (const file of fs.readdirSync(BUNDLES).sort()) {
  if (!file.endsWith(".cjs")) continue;
  const s = fs.readFileSync(path.join(BUNDLES, file), "utf8");
  const re = /typeName:"([a-zA-Z0-9_.]+)",methods:\{([\s\S]{0,80000}?)\}\};/g;
  for (const m of s.matchAll(re)) {
    const [, typeName, body] = m;
    if (!typeName.includes("Service")) continue;
    // method table may contain nested braces only via the kind enum; entries are flat objects
    const methods = {};
    for (const mm of body.matchAll(/(\w+):\{name:"([A-Za-z]+)"[^}]*?kind:[A-Za-z$]+\.(\w+)\}/g)) {
      methods[mm[1]] = { rpcName: mm[2], kind: mm[3] };
    }
    if (!Object.keys(methods).length) continue;
    services.push({ service: typeName, bundle: file, methods });
  }
}
services.sort((a, b) => a.service.localeCompare(b.service));

const out = {
  schema: "grokgrok/services-atlas@1",
  artifact: "Grok_Bot_0.24.0_linux_x64",
  note: "Method names + RPC kinds are artifact-proven from shipped ConnectRPC service tables; input/output message types are minified symbols and intentionally not recovered.",
  totalServices: services.length,
  totalMethods: services.reduce((a, s) => a + Object.keys(s.methods).length, 0),
  services,
};
const dest = path.join(REPO, "evidence", "generated", "services-atlas.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.error(`services-atlas: ${services.length} services, ${out.totalMethods} methods -> ${path.relative(REPO, dest)}`);
