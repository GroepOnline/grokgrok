#!/usr/bin/env node
// Deterministic renderer atlas: chunk topology, routes, product vocabulary,
// source-path markers, design tokens — all from shipped dist/renderer assets.
// Output -> evidence/generated/renderer-atlas.json
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(REPO, ".cache", "artifact", "0.24.0");

function asarGet(inner, dest) {
  const out = path.join(CACHE, "renderer", inner);
  if (!fs.existsSync(out)) {
    execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", inner, out], { stdio: "inherit" });
  }
  return dest ?? out;
}

const inventory = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
const chunks = inventory.files.filter((f) => f.path.startsWith("dist/renderer/assets/") && f.path.endsWith(".js"));

// vocabulary to confirm (mission targets + observed command/event names)
const VOCAB = [
  "Take over", "Teach a task", "What do you use every day?", "suggested teammate",
  "hidden chats", "Hidden chats", "command palette", "Auto-review", "Require Approval",
  "Always Allow", "Agent Computer", "Create custom bot", "Team Setup",
];
const ROUTE_RE = /"(\/(?:onboarding|settings|agents?|computer|plugins|routines|skills|usage|appearance|welcome|signin|sign-in)[a-z/-]*)"/g;

const vocabHits = Object.fromEntries(VOCAB.map((v) => [v, []]));
const routes = new Map();
const srcMarkers = new Set();
const tokens = new Set();
let scannedBytes = 0;

for (const c of chunks) {
  const file = asarGet(c.path);
  const s = fs.readFileSync(file, "utf8");
  scannedBytes += s.length;
  for (const v of VOCAB) {
    if (s.includes(v)) vocabHits[v].push(path.basename(c.path));
  }
  for (const m of s.matchAll(ROUTE_RE)) routes.set(m[1], (routes.get(m[1]) ?? 0) + 1);
  for (const m of s.matchAll(/"((?:\.\.\/)+src\/[\w/.-]+|src\/[a-zA-Z][\w/.-]{3,60}\.(?:tsx|ts|css))"/g)) srcMarkers.add(m[1]);
  if (/\.css$/.test(c.path) || s.includes(":root")) {
    for (const m of s.matchAll(/--([a-z][a-z0-9-]{2,40}):/g)) tokens.add(m[0]);
  }
}

// index.html
let html = null;
try { html = fs.readFileSync(asarGet("dist/renderer/index.html"), "utf8"); } catch {}

const atlas = {
  schema: "grokgrok/renderer-atlas@1",
  chunkCount: chunks.length,
  scannedBytes,
  indexHtml: html ? { scriptRefs: [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]), cssRefs: [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]) } : null,
  largestChunks: chunks.slice().sort((a, b) => b.size - a.size).slice(0, 15).map((c) => ({ path: path.basename(c.path), bytes: c.size })),
  vocabulary: Object.fromEntries(Object.entries(vocabHits).map(([v, hits]) => [v, { confirmed: hits.length > 0, files: hits.slice(0, 3) }])),
  routes: [...routes.entries()].sort((a, b) => b[1] - a[1]).map(([r, n]) => ({ route: r, hits: n })),
  sourcePathMarkers: [...srcMarkers].sort(),
  designTokens: { count: tokens.size, sample: [...tokens].sort().slice(0, 80) },
};

fs.mkdirSync(path.join(REPO, "evidence", "generated"), { recursive: true });
fs.writeFileSync(path.join(REPO, "evidence", "generated", "renderer-atlas.json"), JSON.stringify(atlas, null, 2));
console.error(`renderer atlas: ${chunks.length} chunks, ${atlas.routes.length} routes, ${Object.values(vocabHits).filter((h) => h.length).length}/${VOCAB.length} vocabulary confirmed, ${atlas.sourcePathMarkers.length} src markers`);
