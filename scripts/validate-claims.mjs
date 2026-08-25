#!/usr/bin/env node
// Validate the claim ledger: schema conformance (light, stdlib), id uniqueness,
// confidence enum, and that every referenced validator/artifact file exists.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledger = JSON.parse(fs.readFileSync(path.join(REPO, "claims", "ledger.json"), "utf8"));
const hasArtifactCache = fs.existsSync(path.join(REPO, ".cache", "artifact"));
let failed = 0;
const fail = (m) => { console.error("FAIL:", m); failed++; };

const ids = new Set();
for (const e of ledger.entries) {
  if (!/^CLM-\d{3}$/.test(e.id)) fail(`bad id ${e.id}`);
  if (ids.has(e.id)) fail(`duplicate id ${e.id}`);
  ids.add(e.id);
  if (!["A","B","C","D","E","F"].includes(e.confidence)) fail(`${e.id}: bad confidence ${e.confidence}`);
  for (const ev of e.evidence ?? []) {
    const kinds = ["artifact-string","artifact-structure","lineage-0.18","analogue-grok-build","analogue-openmausbot","official-prompts","public-doc"];
    if (!kinds.includes(ev.kind)) fail(`${e.id}: bad evidence kind ${ev.kind}`);
    if (!ev.source) fail(`${e.id}: evidence without source`);
  }
  for (const ref of [e.validator, ...(e.artifacts ?? [])].filter(Boolean)) {
    if (ref.startsWith("evidence/generated/") && !hasArtifactCache) continue;
    if (!fs.existsSync(path.join(REPO, ref))) fail(`${e.id}: missing file ${ref}`);
  }
}

console.error(failed ? `${failed} ledger problem(s)` : `claims ledger ok (${ledger.entries.length} entries)`);
process.exit(failed ? 1 : 0);
