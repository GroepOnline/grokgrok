#!/usr/bin/env node
// Deterministic validators for the recovered renderer topology.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "renderer-topology.json"), "utf8"));
const inventory = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
const shippedChunks = new Set(inventory.files.filter((f) => f.path.startsWith("dist/renderer/assets/")).map((f) => path.basename(f.path)));

let fail = 0;
const assert = (ok, msg) => { if (!ok) { console.error("FAIL:", msg); fail = 1; } };

// counts consistent with content
assert(t.counts.chunks === Object.keys(t.chunkGraph).length, "chunk count mismatch");
assert(t.counts.transcriptCards === t.transcriptCards.length, "card count mismatch");

// every lazy view chunk referenced by an entrypoint/card exists in the shipped asset set
for (const [dir, ep] of Object.entries(t.entrypoints)) {
  for (const v of [...ep.views, ...ep.entrypoints]) {
    for (const c of v.chunks) assert(shippedChunks.has(c), `${dir}: referenced chunk ${c} missing from artifact`);
  }
}
for (const c of t.transcriptCards) {
  if (c.viewChunk) assert(shippedChunks.has(c.viewChunk), `card ${c.featurePath}: viewChunk ${c.viewChunk} missing`);
}

// every entrypoint dir has at least one entrypoint.ts and (non-critical) a view
for (const [dir, ep] of Object.entries(t.entrypoints)) {
  assert(ep.entrypoints.length > 0, `${dir}: no entrypoint.ts module`);
  assert(ep.views.length > 0 || dir === "chat/workspace", `${dir}: no lazy view sibling`);
}

// graph edges reference existing chunks
for (const [from, g] of Object.entries(t.chunkGraph)) {
  for (const to of [...g.staticImports, ...g.dynamicImports]) {
    assert(shippedChunks.has(to), `edge ${from} -> ${to}: target missing`);
  }
}

// framework declaration matches the observed boundary contract
assert(t.entrypointFramework?.declaration === "entrypoint.ts", "entrypoint declaration contract changed");

if (fail) process.exit(1);
console.log(`renderer topology ok: ${t.counts.entrypointDirs} entrypoints, ${t.counts.transcriptCards} cards, ${t.counts.chunks} chunks, ${t.counts.graphEdges} edges (${t.counts.dynamicBoundaries} lazy)`);
