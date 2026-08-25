// Deterministic DOM/text tests over the built desktop shell (apps/desktop/dist).
// Loads dist/index.html in jsdom, switches scenarios via window.__grokgrok, and
// asserts artifact-anchored text/DOM per scenario. Run: npm run test:dom
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(REPO, "apps", "desktop", "dist");

const dom = new JSDOM(
  fs.readFileSync(path.join(DIST, "index.html"), "utf8").replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/, ""),
  { url: "http://localhost/", runScripts: "outside-only" },
);
const { window } = dom;
// dist files are ESM modules; jsdom eval needs plain scripts — strip module syntax
// and concat in dependency order (dom → surfaces → app). Deterministic build output.
const strip = (f) => fs.readFileSync(path.join(DIST, f), "utf8")
  .replace(/^import [^;]+;\s*$/gm, "")
  .replace(/^export /gm, "");
const appJs = ["dom.js", "surfaces.js", "app.js"].map(strip).join("\n;");
window.eval(appJs);

const hook = /** @type {{ __grokgrok: { setScenario: (id?: string) => void; scenarios: {id: string; evidence: string[]}[] } }} */ (window);
const doc = window.document;

test("shell renders sidebar anchor with pins/groups/channels sections", () => {
  const sb = doc.querySelector(".sidebar");
  assert.ok(sb, "sidebar present");
  assert.equal(sb.dataset.surface, "sidebar");
  assert.ok(sb.querySelector('.bot-item[data-bot-id="b1"] .badge'), "pinned badge shown");
  assert.ok([...sb.querySelectorAll(".group-label")].some((g) => g.textContent === "Work"), "group label");
  assert.ok([...sb.querySelectorAll(".channel-item")].some((c) => c.textContent === "#release-feed"), "channel item");
  // hidden bot stays out of the sidebar
  assert.ok(!sb.querySelector('[data-bot-id="b4"]'), "hidden bot not listed");
});

test("default scenario is the transcript with approval/secret/local-tool cards", () => {
  hook.__grokgrok.setScenario("transcript");
  assert.ok(doc.querySelector('[data-scenario="transcript"]'), "transcript section");
  for (const h of ["Approval required", "Secret request", "Local tool requested"]) {
    assert.ok([...doc.querySelectorAll("h4")].some((x) => x.textContent === h), `card ${h}`);
  }
  assert.match(doc.body.textContent, /Approve once/);
});

test("every scenario exposes evidence refs and renders without throwing", () => {
  assert.ok(hook.__grokgrok.scenarios.length >= 10, "surface coverage");
  for (const s of hook.__grokgrok.scenarios) {
    assert.ok(s.evidence.length > 0, `${s.id} cites evidence`);
    hook.__grokgrok.setScenario(s.id);
    assert.ok(doc.querySelector(`[data-scenario="${s.id}"]`), `${s.id} rendered`);
    assert.ok(doc.querySelector(".main .transcript, .main .surface"), `${s.id} has content`);
  }
});

test("canonical surface ids match recovered renderer topology anchors", async () => {
  // curated committed copy — generated topology json is gitignored
  const surfaces = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/curated/renderer-surfaces.json"), "utf8"));
  const anchors = Object.values(surfaces.surfaceIds);
  const scenarioIds = new Set(hook.__grokgrok.scenarios.map((s) => s.id));
  for (const want of ["overlay:settings", "overlay:plugins", "overlay:computer", "overlay:hidden-chats"]) {
    assert.ok(anchors.includes(want), `topology anchor ${want} exists`);
  }
  for (const id of ["settings", "plugins-marketplace", "computer-takeover-teach", "hidden-chats", "org-chart-network"]) {
    assert.ok(scenarioIds.has(id), `scenario ${id} covers a topology anchor`);
  }
});

test("vocabulary strings match shipped-bundle evidence", () => {
  hook.__grokgrok.setScenario("onboarding-tool-picker");
  assert.match(doc.body.textContent, /What do you use every day\?/);
  hook.__grokgrok.setScenario("computer-takeover-teach");
  assert.match(doc.body.textContent, /Take over/);
  assert.match(doc.body.textContent, /Teach a task/);
});
