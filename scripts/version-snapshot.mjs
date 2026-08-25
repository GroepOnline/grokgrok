#!/usr/bin/env node
// Version snapshot + drift comparison for future 0.25+ artifacts.
//   node scripts/version-snapshot.mjs                 -> writes versions/<v>.json
//   node scripts/version-snapshot.mjs --diff versions/0.24.0.json
//                                                       -> compares current extraction vs snapshot
// Snapshot content is derived from evidence/generated/*.json (reproducible via npm run ingest + analyzers).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN = (...p) => path.join(REPO, "evidence", "generated", ...p);
const VERSIONS = path.join(REPO, "versions");

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

function buildSnapshot() {
  const ingest = readJson(GEN("ingest.json"));
  const proto = readJson(GEN("proto-atlas.json"));
  const handlers = readJson(GEN("main-rpc-handlers.json")) ?? (() => {
    const out = path.join(REPO, ".cache", "handler-scan.tmp.json");
    const main = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles", "electron-main.cjs");
    if (!fs.existsSync(main)) return null;
    execFileSync("node", [path.join(REPO, "scripts", "analyze-main-rpc.mjs"), main], { stdio: ["ignore", fs.openSync(out, "w"), "ignore"] });
    return JSON.parse(fs.readFileSync(out, "utf8"));
  })();
  const features = readJson(GEN("feature-registry.json"));
  const topo = readJson(GEN("renderer-topology.json"));

  return {
    schema: "grokgrok/version-snapshot@1",
    artifactVersion: ingest?.artifact.version ?? "unknown",
    artifactSha256: ingest?.artifact.sha256 ?? null,
    capturedAt: new Date().toISOString(),
    protoAtlas: proto ? {
      messages: proto.messages.map((m) => m.fullName).sort(),
      enums: proto.enums.map((e) => e.fullName).sort(),
      services: proto.services.flatMap((s) => s.methods.map((m) => `${s.fullName}.${m.name}(${m.inputType})->${m.outputType}`)).sort(),
      fieldCount: proto.counts.fields,
    } : null,
    mainRpc: handlers ? {
      methods: handlers.handlers.map((h) => h.method).sort(),
      typedPayloadFields: Object.fromEntries(handlers.handlers.filter((h) => h.fieldTypes).map((h) => [h.method, h.fieldTypes])),
    } : null,
    features: features ? {
      gates: Object.keys(features.gates).sort(),
      dynamicConfigs: Object.keys(features.dynamicConfigs).sort(),
    } : null,
    rendererTopology: topo ? {
      entrypointDirs: Object.keys(topo.entrypoints).sort(),
      transcriptCards: topo.transcriptCards.map((c) => c.featurePath).sort(),
      chunkCount: topo.counts.chunks,
    } : null,
  };
}

const args = process.argv.slice(2);
if (args[0] === "--diff") {
  const oldPath = path.resolve(args[1]);
  const oldSnap = JSON.parse(fs.readFileSync(oldPath, "utf8"));
  const cur = buildSnapshot();
  let changes = 0;
  /** @type {(label:string, a:string[]|undefined, b:string[]|undefined) => void} */
  const diffList = (label, a, b) => {
    const A = new Set(a), B = new Set(b);
    const added = [...B].filter((x) => !A.has(x));
    const removed = [...A].filter((x) => !B.has(x));
    if (added.length || removed.length) {
      changes += added.length + removed.length;
      console.log(`\n${label}:`);
      for (const x of added) console.log(`  + ${x}`);
      for (const x of removed) console.log(`  - ${x}`);
    } else console.log(`${label}: unchanged (${b?.length})`);
  };
  console.log(`diff ${path.basename(oldPath)} (artifact ${oldSnap.artifactVersion}) -> current extraction (artifact ${cur.artifactVersion})`);
  diffList("protobuf messages", oldSnap.protoAtlas?.messages, cur.protoAtlas?.messages);
  diffList("protobuf enums", oldSnap.protoAtlas?.enums, cur.protoAtlas?.enums);
  diffList("protobuf service methods", oldSnap.protoAtlas?.services, cur.protoAtlas?.services);
  diffList("main-rpc methods", oldSnap.mainRpc?.methods, cur.mainRpc?.methods);
  diffList("feature gates", oldSnap.features?.gates, cur.features?.gates);
  diffList("dynamic-config keys", oldSnap.features?.dynamicConfigs, cur.features?.dynamicConfigs);
  diffList("renderer entrypoints", oldSnap.rendererTopology?.entrypointDirs, cur.rendererTopology?.entrypointDirs);
  diffList("transcript cards", oldSnap.rendererTopology?.transcriptCards, cur.rendererTopology?.transcriptCards);
  if (changes === 0) console.log("\nno surface changes");
  process.exitCode = 0;
} else {
  fs.mkdirSync(VERSIONS, { recursive: true });
  const snap = buildSnapshot();
  const dest = path.join(VERSIONS, `v${snap.artifactVersion}.json`);
  fs.writeFileSync(dest, JSON.stringify(snap, null, 2) + "\n");
  console.log(`snapshot written: ${path.relative(REPO, dest)}`);
}
