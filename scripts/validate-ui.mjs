#!/usr/bin/env node
// Deterministic UI-evidence validator.
//  1. renderer-atlas.json / ui-evidence-matrix.json schema + confirmation invariants
//  2. apps/desktop/labels.ts <-> matrix consistency (every shipped string proven)
//  3. scenario registry covers every major surface
//  4. recovered registries (event cards, transcript kinds, kv namespaces) intact
// Artifact-free runs (no .cache / no generated evidence) validate structure only.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;
const fail = (msg) => { console.error(`FAIL ${msg}`); failed = 1; };
const ok = (msg) => console.error(`ok   ${msg}`);

const atlasPath = path.join(REPO, "evidence/generated/renderer-atlas.json");
const matrixPath = path.join(REPO, "evidence/generated/ui-evidence-matrix.json");
const hasArtifact = fs.existsSync(atlasPath) && fs.existsSync(matrixPath);

// artifact truth constants (must match scripts/analyze-renderer.mjs recovery)
const EVENT_CARDS = ["pr-opened", "pr-pushed", "pr-merged", "review-requested", "review-approved",
  "review-changes-requested", "review-commented", "pr-comment", "inline-review-comment",
  "review-thread-resolved", "review-thread-unresolved", "issue-assigned", "ci-passed", "ci-failed"];
const REQUIRED_SCENARIOS = ["default", "onboarding", "create-bot", "approvals", "computer",
  "bot-details", "routines", "plugins", "settings-appearance", "settings-updates",
  "hidden-chats", "org-chart", "palette"];

// ---- 1. generated evidence ----
if (hasArtifact) {
  const atlas = JSON.parse(fs.readFileSync(atlasPath, "utf8"));
  const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
  atlas.schema === "grokgrok/renderer-atlas@2"
    ? ok(`atlas schema ${atlas.schema}, ${atlas.chunkCount} chunks`)
    : fail(`unexpected atlas schema ${atlas.schema}`);
  atlas.moduleGraph.lazyBoundaryCount > 0
    ? ok(`lazy boundaries: ${atlas.moduleGraph.lazyBoundaryCount}`)
    : fail("no lazy boundaries recovered");
  for (const cluster of ["chat", "agents", "settings", "core", "view", "shared"]) {
    atlas.clusters[cluster] ? ok(`cluster ${cluster}: ${atlas.clusters[cluster].chunks.length} chunks`)
      : fail(`missing expected cluster ${cluster}`);
  }
  for (const ns of ["sidebar.last-sections", "transcript.replicas", "selection.last-agent"]) {
    atlas.kvNamespaces.includes(ns) ? ok(`kv namespace ${ns}`) : fail(`kv namespace ${ns} missing`);
  }
  atlas.transcriptItemRegistry.kinds.includes("secret-request")
    ? ok(`transcript kinds: ${atlas.transcriptItemRegistry.kinds.length}`)
    : fail("transcript kinds registry incomplete");
  JSON.stringify(atlas.transcriptItemRegistry.eventCards) === JSON.stringify(EVENT_CARDS)
    ? ok(`event card registry: ${EVENT_CARDS.length} ids`)
    : fail("event card registry drift");

  matrix.schema === "grokgrok/ui-evidence-matrix@1"
    ? ok(`matrix schema ${matrix.schema}, ${matrix.surfaces.length} surfaces`)
    : fail(`unexpected matrix schema ${matrix.schema}`);
  for (const sf of matrix.surfaces) {
    const unconfirmed = sf.labels.filter((l) => !l.confirmed);
    unconfirmed.length === 0 ? ok(`surface ${sf.surface}: ${sf.labels.length} labels confirmed`)
      : fail(`surface ${sf.surface} has unconfirmed labels: ${unconfirmed.map((l) => l.text).join("; ")}`);
  }
} else {
  console.error("skip generated-evidence checks (artifact evidence not generated here)");
}

// ---- 2. labels.ts <-> matrix ----
const labelsSrc = fs.readFileSync(path.join(REPO, "apps/desktop/labels.ts"), "utf8");
const labelEntries = [...labelsSrc.matchAll(/^\s{2}(\w+): \{ surface: "([^"]+)", text: "((?:[^"\\]|\\.)*)", key: "((?:[^"\\]|\\.)*)", chunks: \[([^\]]*)\] \},?$/gm)]
  .map((m) => ({ id: m[1], surface: m[2], text: JSON.parse(`"${m[3]}"`), key: JSON.parse(`"${m[4]}"`) }));
labelEntries.length >= 100
  ? ok(`labels.ts: ${labelEntries.length} labels`)
  : fail(`labels.ts: only ${labelEntries.length} labels parsed`);
if (hasArtifact) {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
  const matrixLookup = new Map();
  for (const sf of matrix.surfaces) for (const l of sf.labels) matrixLookup.set(`${sf.surface}\u0000${l.text}`, l);
  let drift = 0;
  for (const e of labelEntries) {
    const hit = matrixLookup.get(`${e.surface}\u0000${e.text}`);
    if (!hit || !hit.confirmed || hit.catalogKey !== e.key) {
      fail(`label ${e.id} (${e.surface}) not backed by matrix or key drift`);
      drift++;
    }
  }
  if (!drift) ok("all labels.ts entries match matrix provenance");
}

// ---- 3. scenario coverage ----
const fixturesSrc = fs.readFileSync(path.join(REPO, "apps/desktop/fixtures.ts"), "utf8");
const scenariosMatch = fixturesSrc.match(/export const SCENARIOS = \[([^\]]+)\]/);
if (!scenariosMatch) { fail("SCENARIOS registry not found in fixtures.ts"); }
else {
  const scenarios = [...scenariosMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  for (const req of REQUIRED_SCENARIOS) {
    scenarios.includes(req) ? ok(`scenario ${req}`) : fail(`missing scenario ${req}`);
  }
}

// ---- 4. recovered registries in state.ts ----
const stateSrc = fs.readFileSync(path.join(REPO, "apps/desktop/state.ts"), "utf8");
const cardsInState = [...stateSrc.matchAll(/"((?:pr|review|inline|issue|ci)-?[a-z-]*)",/g)].map((m) => m[1])
  .filter((c) => EVENT_CARDS.includes(c));
new Set(cardsInState).size === EVENT_CARDS.length
  ? ok(`state.ts event cards: ${new Set(cardsInState).size}`)
  : fail(`state.ts event cards incomplete (${new Set(cardsInState).size}/${EVENT_CARDS.length})`);

process.exitCode = failed;
console.error(failed ? "validate-ui: FAILED" : "validate-ui: all checks passed");
