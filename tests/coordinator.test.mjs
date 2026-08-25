import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gen = fs.readFileSync(path.join(REPO, "src/wire/coordinator-bridge.generated.ts"), "utf8");

test("coordinator exposes 100+ artifact-proven commands", () => {
  const n = [...gen.matchAll(/^  ([A-Za-z_$][\w$]*): \{ args:/gm)].length;
  assert.ok(n >= 100, `expected >=100 commands, got ${n}`);
});

test("core agent-runtime commands present", () => {
  for (const cmd of ["createAgent", "sendPrompt", "getSubagents", "startTeachRecording",
    "createAgentAutomation", "ensureForeverBox", "publishSkill", "joinSharedRoom"]) {
    assert.match(gen, new RegExp(`\\b${cmd}: \\{ args: "`));
  }
});

test("frame kinds and lifecycle phases recorded", () => {
  assert.match(gen, /FRAME_KINDS = \[.*"lifecycle".*"request"/s);
  assert.match(gen, /LIFECYCLE_PHASES = \[.*"hello".*"ready"/s);
});
