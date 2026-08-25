import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gen = fs.readFileSync(path.join(REPO, "src/wire/desktop-bridge.generated.ts"), "utf8");

test("main edge exposes exactly 145 methods", () => {
  const n = [...gen.matchAll(/^  ([A-Za-z_$][\w$]*): \{ args:/gm)].length;
  assert.equal(n, 145);
});

test("spot-check artifact-proven payload keys", () => {
  assert.match(gen, /openExternal: \{ args: "object", payloadKeys: \["url"\] \}/);
  assert.match(gen, /setHostPinnedAgents: \{ args: "object", payloadKeys: \["pinnedAgentIds"\] \}/);
  assert.match(gen, /stageAttachmentBytes: \{ args: "object", payloadKeys: \["filename", "bytes"\] \}/);
  assert.match(gen, /getDesktopEnvironment: \{ args: "none" \}/);
});

test("event list excludes EventEmitter internals but has domain events", () => {
  const evts = [...gen.matchAll(/^  "([^"]+)",$/gm)].map((m) => m[1]);
  assert.ok(evts.length > 10);
  assert.ok(!evts.includes("data"));
  assert.ok(!evts.includes("error"));
  for (const expected of ["update-status", "deep-link", "vnc-user-presence", "theme-changed"]) {
    assert.ok(evts.includes(expected), `missing event ${expected}`);
  }
});
