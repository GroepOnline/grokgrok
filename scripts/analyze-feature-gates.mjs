#!/usr/bin/env node
// Deterministic feature-gate / dynamic-config atlas from shipped bundles.
// Mines per-bundle: SAND_* env vocabulary, Statsig endpoints/strings,
// and experiment/gate name literals. Presence in the bundle is capability
// evidence only — it does NOT imply the gate is remotely enabled.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");

const bundles = {};
const envByBundle = {};
for (const file of fs.readdirSync(BUNDLES).sort()) {
  if (!file.endsWith(".cjs")) continue;
  const s = fs.readFileSync(path.join(BUNDLES, file), "utf8");
  const env = [...new Set([...s.matchAll(/SAND_[A-Z0-9_]+/g)].map((m) => m[0]))].sort();
  envByBundle[file] = env;
  bundles[file] = { envFlagCount: env.length };
}

// union + per-flag provenance
const provenance = {};
for (const [file, flags] of Object.entries(envByBundle)) {
  for (const f of flags) (provenance[f] ??= []).push(file);
}

// classify: SCREAMING_SNAKE enum members vs real config knobs
const ENUM_RE = /_(UNSPECIFIED|GRANTED|RUNNING|HIBERNATED|ABSENT|FAILED|DONE|MOVING|WIPING|CREATING|CLEANING_UP|BACKING_UP|SCHEDULED|CLAIMED|COMPLETED|MISSED|CANCELLED|WAITING_FOR_IMAGE|ALLOW_ALL|DEFAULT_WITH_NETWORK_SETTINGS|NETWORK_SETTINGS_ONLY|PAYMENT_REQUIRED|UNAVAILABLE|PENDING_CARD|NONE|BLOCKED|IN_APP|MANAGE_IN_CURSOR|MANAGE_ON_WEB|TEAM|USER|ORGANIZATION)$/;
const enumMembers = Object.keys(provenance).filter((f) => ENUM_RE.test(f));
const knobs = Object.keys(provenance).filter((f) => !ENUM_RE.test(f));

// semantic groups over the knob vocabulary (prefix-based, artifact-derived)
const groupOf = (f) => {
  if (/^SAND_BOX_STORE_/.test(f)) return "box-store";
  if (/^SAND_DEV_BOX_|^SAND_DEV_/.test(f)) return "dev-only";
  if (/^SAND_GATEWAY_/.test(f)) return "gateway";
  if (/^SAND_EGRESS_TUNNEL/.test(f)) return "egress-tunnel";
  if (/^SAND_MEMORY_/.test(f)) return "agent-memory-pipeline";
  if (/^SAND_ACCESS_/.test(f)) return "access-paywall";
  if (/^SAND_TRIAL_/.test(f)) return "trial-claims";
  if (/^SAND_BOX_UPGRADE_SCHEDULE_STATE_/.test(f)) return "upgrade-schedule-enum";
  if (/^SAND_BOX_RUN_STATE_/.test(f)) return "box-run-state-enum";
  if (/^SAND_BOX_MIGRATION_PHASE_/.test(f)) return "migration-phase-enum";
  if (/^SAND_BOX_COMPUTER|^SAND_BOX_CLUSTER/.test(f)) return "computers";
  if (/^SAND_LOCAL_EXEC|^SAND_HOST_IN_BOX|^SAND_HOST_/.test(f)) return "host-local-exec";
  if (/^SAND_DISABLE_/.test(f)) return "kill-switches";
  return "product-misc";
};
const groups = {};
for (const f of knobs) (groups[groupOf(f)] ??= []).push(f);
for (const g of Object.keys(groups)) groups[g].sort();

// Statsig surface strings across all bundles
const statsigStrings = new Map();
for (const file of fs.readdirSync(BUNDLES).sort()) {
  if (!file.endsWith(".cjs")) continue;
  const s = fs.readFileSync(path.join(BUNDLES, file), "utf8");
  for (const pat of [
    "featureassets.org", "statsigapi.net", "experiment_name",
    "use_experimental_model_opt_out", "trace_flags", "feature_gate", "dynamic_config",
    "getExperimentsSnapshot", "applyFeatureFlagOverride", "refreshFeatureFlags",
    "SAND_FEATURE_GATE_OVERRIDES", "SAND_MODEL_EXPERIMENT_OVERRIDE",
    "SAND_SLIM_SYSTEM_PROMPT_EXPERIMENT_NAME",
  ]) {
    const n = s.split(pat).length - 1;
    if (n > 0) statsigStrings.set(pat, [...(statsigStrings.get(pat) ?? []), [file, n]]);
  }
}

const out = {
  schema: "grokgrok/feature-gates@1",
  artifact: "Grok_Bot_0.24.0_linux_x64",
  note: "Bundled names are capability evidence only; presence != remotely enabled. Default assignment semantics are NOT recoverable from the shipped client.",
  mechanism: {
    provider: "Statsig SDK",
    endpoints: ["https://featureassets.org/v1 (fetch)", "https://statsigapi.net/v1/sdk_exception"],
    desktopCommands: ["getExperimentsSnapshot", "applyFeatureFlagOverride", "refreshFeatureFlags"],
    overrideEnv: ["SAND_FEATURE_GATE_OVERRIDES", "SAND_MODEL_EXPERIMENT_OVERRIDE"],
  },
  totals: {
    distinctSandNames: Object.keys(provenance).length,
    enumMembers: enumMembers.length,
    configKnobs: knobs.length,
  },
  groups,
  enumMembers: enumMembers.sort(),
  provenance,
  statsigStrings: Object.fromEntries([...statsigStrings.entries()].sort()),
};
const dest = path.join(REPO, "evidence", "generated", "feature-gates.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.error(`feature-gates: ${out.totals.distinctSandNames} SAND_* names (${knobs.length} knobs, ${enumMembers.length} enum members) -> ${path.relative(REPO, dest)}`);
