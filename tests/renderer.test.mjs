import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hasArtifact = fs.existsSync(path.join(REPO, "evidence/generated/renderer-atlas.json"));

test("renderer atlas: chunk topology + module graph", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/renderer-atlas.json"), "utf8"));
  assert.equal(atlas.schema, "grokgrok/renderer-atlas@2");
  assert.equal(atlas.chunkCount, 171);
  assert.ok(atlas.moduleGraph.staticEdgeCount > 100, "static import edges recovered");
  assert.ok(atlas.moduleGraph.lazyBoundaryCount > 100, "lazy boundaries recovered");
  // entry bundle statically references lazy view chunks
  const entry = Object.keys(atlas.moduleGraph.lazy).find((k) => k.startsWith("index-"));
  assert.ok(entry, "entry chunk found in lazy graph");
  assert.ok(atlas.moduleGraph.lazy[entry].some((t) => t.startsWith("view-")), "entry lazily imports view-* chunks");
});

test("renderer atlas: semantic clusters", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/renderer-atlas.json"), "utf8"));
  for (const c of ["chat", "agents", "settings", "core", "shared", "view", "general", "updates"]) {
    assert.ok(atlas.clusters[c], `cluster ${c} present`);
  }
  assert.ok(atlas.clusters["view"].chunks.length >= 20);
});

test("renderer atlas: stores + registries", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/renderer-atlas.json"), "utf8"));
  assert.deepEqual(
    [...atlas.kvNamespaces].sort(),
    [
      "client-meta.account-slot", "composer-drafts", "host-settings.onboarding",
      "roster.agent-avatars", "roster.last-roster", "selection.last-agent",
      "send-journal", "sidebar.last-sections", "transcript.replicas",
      "ui-agent-refs", "ui-layout", "other",
    ].sort(),
  );
  assert.equal(atlas.transcriptItemRegistry.kinds.length, 14);
  assert.ok(atlas.transcriptItemRegistry.kinds.includes("secret-request"));
  assert.ok(atlas.transcriptItemRegistry.kinds.includes("auto-review-approval"));
  assert.equal(atlas.transcriptItemRegistry.eventCards.length, 14);
  assert.ok(atlas.transcriptItemRegistry.eventCards.includes("review-changes-requested"));
});

test("ui evidence matrix: every curated label confirmed with provenance", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const matrix = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/ui-evidence-matrix.json"), "utf8"));
  assert.equal(matrix.schema, "grokgrok/ui-evidence-matrix@1");
  assert.ok(matrix.surfaces.length >= 17);
  for (const sf of matrix.surfaces) {
    for (const l of sf.labels) {
      assert.ok(l.confirmed, `${sf.surface}: unconfirmed label "${l.text}"`);
      assert.ok(l.catalogKey && l.catalogKey.length > 0, `${sf.surface}: label "${l.text}" missing catalogKey`);
      assert.ok(l.chunks.length > 0, `${sf.surface}: label "${l.text}" missing chunk provenance`);
    }
  }
});

test("design tokens: --sand-* vocabulary present", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/renderer-atlas.json"), "utf8"));
  assert.ok(atlas.designTokens.sand.length >= 50, `--sand-* tokens: ${atlas.designTokens.sand.length}`);
  for (const family of ["--sand-shadow-popover", "--sand-shadow-modal", "--sand-bg-"]) {
    assert.ok(atlas.designTokens.sand.some((t) => t.startsWith(family)), `token family ${family}`);
  }
});
