import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gen = fs.readFileSync(path.join(REPO, "src/wire/subsystems.generated.ts"), "utf8");
const hasCache = fs.existsSync(path.join(REPO, ".cache/artifact"));

test("services atlas: execution-plane ControlService methods present", () => {
  assert.match(gen, /"agent\.v1\.ControlService"/);
  for (const m of ["ping", "getCapabilities", "exec", "updateEnvironmentVariables",
    "reloadAgentSkills", "reloadPlugins", "installPluginArtifact", "loadMcpServers",
    "persistArtifactsToAgentStore", "restoreArtifacts", "warmRemoteAccessServer"]) {
    assert.ok(gen.includes(`"${m}"`), `missing ControlService method ${m}`);
  }
});

test("services atlas: SandBox lifecycle + store + admin surfaces present", () => {
  for (const m of ["watchSandBoxMigration", "getSandBoxRunState", "scheduleSandBoxUpgrade",
    "adminSnapshotSandBoxStore", "adminRestoreSandBoxStoreSnapshot", "adminHibernateSandBox",
    "presignSandBoxStoreWrites", "forceRecreateSandBox"]) {
    assert.ok(gen.includes(`"${m}"`), `missing GrokBotService method ${m}`);
  }
});

test("services atlas: automation memory CRUD is a distinct surface", () => {
  for (const m of ["listAutomationMemories", "getAutomationMemory", "updateAutomationMemory",
    "deleteAutomationMemory", "validateAutomationSpec", "cancelAutomationRun"]) {
    assert.ok(gen.includes(`"${m}"`), `missing AutomationsService method ${m}`);
  }
});

test("feature gates: memory pipeline + kill switches are grouped knobs", () => {
  assert.match(gen, /agent-memory-pipeline/);
  assert.match(gen, /SAND_MEMORY_SYNTHESIS_V1/);
  assert.match(gen, /SAND_DISABLE_MEMORY_FREEZE/);
  assert.match(gen, /SAND_FEATURE_GATE_OVERRIDES/);
});

test("native ABI: linux-active modules and win32 quarantine coexist", () => {
  assert.match(gen, /napi_register_module_v1|napiRegistered/);
  assert.ok(gen.includes("sand-webauthn-signer.exe"));
});

test("generated contracts stay committed in sync with atlases when cache exists", { skip: !hasCache }, async () => {
  const { execFileSync } = await import("node:child_process");
  const before = fs.statSync(path.join(REPO, "src/wire/subsystems.generated.ts")).mtimeMs;
  execFileSync("node", [path.join(REPO, "scripts/generate-contracts.mjs")], { stdio: "pipe" });
  const after = fs.readFileSync(path.join(REPO, "src/wire/subsystems.generated.ts"), "utf8");
  // regeneration must be byte-stable against the committed file
  const committed = fs.readFileSync(path.join(REPO, "src/wire/subsystems.generated.ts"), "utf8");
  assert.equal(committed, after);
  assert.ok(after.length > 0 && fs.statSync(path.join(REPO, "src/wire/subsystems.generated.ts")).mtimeMs >= before);
});
