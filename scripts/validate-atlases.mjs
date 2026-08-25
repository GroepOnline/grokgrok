#!/usr/bin/env node
// Validate atlas invariants (schema tags, count consistency, evidence hygiene).
// Skips gracefully when the artifact cache is absent (CI without payload).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN = path.join(REPO, "evidence", "generated");
const hasCache = fs.existsSync(path.join(REPO, ".cache", "artifact"));
let failed = 0;
const fail = (m) => { console.error("FAIL:", m); failed++; };

if (!hasCache && !fs.existsSync(path.join(GEN, "services-atlas.json"))) {
  console.error("no artifact cache and no atlases; skipping atlas validation");
  process.exit(0);
}

const load = (f) => JSON.parse(fs.readFileSync(path.join(GEN, f), "utf8"));

// services-atlas
{
  const a = load("services-atlas.json");
  if (!a.schema?.startsWith("grokgrok/services-atlas@")) fail("services-atlas: bad schema");
  if (a.totalServices !== a.services.length) fail("services-atlas: totalServices mismatch");
  const methodCount = a.services.reduce((n, s) => n + Object.keys(s.methods).length, 0);
  if (a.totalMethods !== methodCount) fail(`services-atlas: totalMethods ${a.totalMethods} != counted ${methodCount}`);
  for (const s of a.services) {
    if (!s.bundle.endsWith(".cjs")) fail(`services-atlas: bad bundle ${s.bundle}`);
    for (const [k, m] of Object.entries(s.methods)) {
      if (!["Unary", "ServerStreaming", "ClientStreaming", "BiDiStreaming"].includes(m.kind))
        fail(`services-atlas: ${s.service}.${k} bad kind ${m.kind}`);
      if (!/^[A-Z][A-Za-z0-9]*$/.test(m.rpcName)) fail(`services-atlas: bad rpcName ${m.rpcName}`);
    }
  }
}

// feature-gates
{
  const g = load("feature-gates.json");
  if (!g.schema?.startsWith("grokgrok/feature-gates@")) fail("feature-gates: bad schema");
  const grouped = Object.values(g.groups).flat();
  if (grouped.length !== g.totals.configKnobs) fail("feature-gates: group coverage != configKnobs");
  if (grouped.length + g.enumMembers.length !== g.totals.distinctSandNames) fail("feature-gates: knobs+enums != distinct");
  const all = new Set(grouped);
  if (all.size !== grouped.length) fail("feature-gates: duplicate knob across groups");
  for (const e of g.enumMembers) if (g.provenance[e] === undefined) fail(`feature-gates: enum member ${e} missing provenance`);
}

// mcp-skills-atlas
{
  const m = load("mcp-skills-atlas.json");
  if (!m.schema?.startsWith("grokgrok/mcp-skills@")) fail("mcp-skills-atlas: bad schema");
  for (const c of m.skillsPlugins.controlServiceMethods)
    if (!/^[A-Z][A-Za-z0-9]*$/.test(c)) fail(`mcp-skills-atlas: bad ControlService method ${c}`);
  for (const c of m.skillsPlugins.coordinatorCommands)
    if (!/^[a-z][A-Za-z0-9]*$/.test(c)) fail(`mcp-skills-atlas: bad coordinator command ${c}`);
  // cross-check against services atlas where possible
  const svc = load("services-atlas.json");
  const control = svc.services.find((s) => s.service === "agent.v1.ControlService");
  if (control) {
    const lower = (n) => n[0].toLowerCase() + n.slice(1);
    for (const c of m.skillsPlugins.controlServiceMethods)
      if (!control.methods[lower(c)]) fail(`mcp-skills-atlas: ${c} not in ControlService table`);
  }
}

// native-abi
{
  const n = load("native-abi.json");
  if (!n.schema?.startsWith("grokgrok/native-abi@")) fail("native-abi: bad schema");
  if (n.totals.binaries !== n.modules.length) fail("native-abi: totals.binaries mismatch");
  if (n.totals.win32Only !== n.quarantinedWin32Stubs.length) fail("native-abi: quarantine list mismatch");
  for (const m of n.modules) {
    if (m.kind === "windows-executable-helper" && m.linuxRuntimeActive !== false)
      fail(`native-abi: .exe not quarantined: ${m.file}`);
    if (m.file.includes(".exe") === false && m.linuxRuntimeActive === false &&
        !/win32/.test(m.platform ?? "")) fail(`native-abi: non-win32 flagged inactive: ${m.file}`);
  }
}

console.error(failed ? `${failed} atlas problem(s)` : `atlases ok`);
process.exit(failed ? 1 : 0);
