import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hasArtifact = fs.existsSync(path.join(REPO, "evidence/generated/ui-evidence-matrix.json"));

const read = (p) => fs.readFileSync(path.join(REPO, p), "utf8");

test("labels registry: complete, provenance-backed, unique ids", () => {
  const src = read("apps/desktop/labels.ts");
  const ids = [...src.matchAll(/^\s{2}(\w+): \{/gm)].map((m) => m[1]);
  assert.ok(ids.length >= 100, `expected >=100 labels, got ${ids.length}`);
  assert.equal(new Set(ids).size, ids.length, "label ids unique");
  // every entry carries key + chunks provenance
  const entries = [...src.matchAll(/^\s{2}\w+: \{ surface: "[^"]+", text: "(?:[^"\\]|\\.)*", key: "(?:[^"\\]|\\.)*", chunks: \[[^\]]*\] \},?\s*$/gm)];
  assert.equal(entries.length, ids.length, "all entries have provenance fields");
});

test("labels registry matches regenerated matrix", { skip: !hasArtifact && "artifact evidence not generated" }, () => {
  const matrix = JSON.parse(read("evidence/generated/ui-evidence-matrix.json"));
  const lookup = new Map();
  for (const sf of matrix.surfaces) for (const l of sf.labels) lookup.set(`${sf.surface}\u0000${l.text}`, l);
  const src = read("apps/desktop/labels.ts");
  for (const m of src.matchAll(/^\s{2}\w+: \{ surface: "([^"]+)", text: "((?:[^"\\]|\\.)*)", key: "((?:[^"\\]|\\.)*)"/gm)) {
    const hit = lookup.get(`${m[1]}\u0000${JSON.parse(`"${m[2]}"`)}`);
    assert.ok(hit, `${m[1]}: label not in matrix`);
    assert.equal(hit.catalogKey, JSON.parse(`"${m[3]}"`), `${m[1]}: catalog key drift`);
  }
});

test("shell copy uses only registered artifact labels (no invented product strings)", () => {
  const labelsSrc = read("apps/desktop/labels.ts");
  const texts = new Set([...labelsSrc.matchAll(/text: "((?:[^"\\]|\\.)*)"/g)].map((m) => JSON.parse(`"${m[1]}"`)));
  // strings >=4 chars rendered by views must be registered labels or marked
  // visual-inference via a comment on the same line
  for (const view of ["apps/desktop/views-core.ts", "apps/desktop/views-surfaces.ts"]) {
    const src = read(view);
    for (const m of src.matchAll(/el\("(?:h\d|button|span|div|p)", "[^"]*", "([^"]{4,})"\)/g)) {
      const text = m[1];
      if (texts.has(text)) continue;
      const line = src.slice(0, m.index).split("\n").length;
      const lineText = src.split("\n")[line - 1] ?? "";
      assert.match(lineText, /visual-inference/, `${view}:${line} unregistered copy "${text}" needs visual-inference mark`);
    }
  }
});

test("scenario registry covers every major surface", () => {
  const fixtures = read("apps/desktop/fixtures.ts");
  const block = fixtures.match(/export const SCENARIOS = \[([^\]]+)\]/)?.[1] ?? "";
  const scenarios = [...block.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]);
  for (const s of ["default", "onboarding", "create-bot", "approvals", "computer", "teach",
    "bot-details", "routines", "plugins", "settings-general", "settings-appearance",
    "settings-updates", "hidden-chats", "org-chart", "palette", "empty-sidebar"]) {
    assert.ok(scenarios.includes(s), `missing scenario ${s}`);
  }
});

test("state registries mirror artifact-recovered registries", () => {
  const state = read("apps/desktop/state.ts");
  assert.match(state, /"client-meta\.account-slot"/);
  assert.match(state, /"sidebar\.last-sections"/);
  assert.match(state, /"auto-review-approval"/);
  assert.match(state, /"review-changes-requested"/);
  const cards = [...state.matchAll(/"(pr-[\w-]+|review-[\w-]+|inline-review-comment|issue-assigned|ci-passed|ci-failed)",/g)].map((m) => m[1]);
  assert.equal(new Set(cards).size, 14);
});

test("desktop build artifacts exist after build:desktop", { skip: !fs.existsSync(path.join(REPO, "apps/desktop/dist/app.js")) && "run npm run build:desktop first" }, () => {
  const dist = path.join(REPO, "apps/desktop/dist");
  for (const f of ["app.js", "state.js", "labels.js", "views-core.js", "views-surfaces.js", "fixtures.js", "index.html", "styles.css"]) {
    assert.ok(fs.existsSync(path.join(dist, f)), `dist/${f} missing`);
  }
  // emitted imports keep explicit .js extensions (browser-loadable ESM)
  const app = fs.readFileSync(path.join(dist, "app.js"), "utf8");
  for (const m of app.matchAll(/from "(\.[^"]+)"/g)) {
    assert.ok(m[1].endsWith(".js"), `non-extensioned import ${m[1]}`);
  }
});
