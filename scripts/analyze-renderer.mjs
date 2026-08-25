#!/usr/bin/env node
// Deterministic renderer atlas: chunk topology, lazy boundaries, semantic
// clusters, stores/actions, transcript-card registry, i18n label catalog,
// design tokens — all recovered from shipped dist/renderer assets.
//
// Outputs (gitignored, reproducible):
//   evidence/generated/renderer-atlas.json      topology + vocabulary + tokens
//   evidence/generated/ui-evidence-matrix.json  surface -> artifact-backed labels
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(REPO, ".cache", "artifact", "0.24.0");

function asarGet(inner) {
  const out = path.join(CACHE, "renderer", inner);
  if (!fs.existsSync(out)) {
    execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", inner, out], { stdio: "inherit" });
  }
  return out;
}

const inventory = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
const chunks = inventory.files.filter((f) => f.path.startsWith("dist/renderer/assets/") && f.path.endsWith(".js"));
const cssFiles = inventory.files.filter((f) => f.path.startsWith("dist/renderer/assets/") && f.path.endsWith(".css"));

// ---------- vocabulary (mission targets; confirmed per chunk) ----------
const VOCAB = [
  "Take over", "Teach a task", "What do you use every day?", "suggested teammate",
  "hidden chats", "Hidden chats", "Hidden Bots", "command palette", "Command palette",
  "Auto-review", "Require Approval", "Always allow", "Agent Computer", "Create custom bot",
  "Team Setup", "Org chart", "Bot network", "Routines", "Triggers", "Plugins",
  "Appearance", "Updates", "General", "New Channel", "Groups", "Channels",
  "Character shape", "Shuffle", "Describe your avatar", "Approval needed",
];
const ROUTE_RE = /"(\/(?:onboarding|settings|agents?|computer|plugins|routines|skills|usage|appearance|welcome|signin|sign-in)[a-z/-]*)"/g;

const vocabHits = Object.fromEntries(VOCAB.map((v) => [v, []]));
const routes = new Map();
const srcMarkers = new Set();
const tokens = new Set();

// module graph: static `from"./x.js"` edges and dynamic `import("./x.js")`
const staticEdges = new Map(); // chunk -> Set(chunk)
const lazyTargets = new Map(); // chunk -> Set(dynamically imported chunk)
// stores/actions: persistence-namespace allowlist. Shipped renderer builds
// `const T=["ns.key",...,"other"],S=new Set(T)` for kv-key validation.
// Anchor deterministically on array-literal-immediately-wrapped-in-new(Set).
const storeNames = new Map();
const setTables = [];
// transcript-card registry: the notification/event card id array
const CARD_IDS_RE = /\[(?:"(?:pr-opened|pr-pushed|pr-merged|review-requested|review-approved|review-changes-requested|review-commented|pr-comment|inline-review-comment|review-thread-(?:un)?resolved|issue-assigned|ci-passed|ci-failed)",){3,}/;
let cardRegistryChunk = null;
// i18n label catalog: "key":["text"]
const labelCatalog = new Map(); // text -> { key, chunks:Set }

for (const c of chunks) {
  const name = path.basename(c.path);
  const file = asarGet(c.path);
  const s = fs.readFileSync(file, "utf8");
  for (const v of VOCAB) {
    if (s.includes(v)) vocabHits[v].push(name);
  }
  for (const m of s.matchAll(ROUTE_RE)) routes.set(m[1], (routes.get(m[1]) ?? 0) + 1);
  for (const m of s.matchAll(/"((?:\.\.\/)+src\/[\w/.-]+|src\/[a-zA-Z][\w/.-]{3,60}\.(?:tsx|ts|css))"/g)) srcMarkers.add(m[1]);
  for (const m of s.matchAll(/from"\.\/([\w.-]+\.js)"/g)) {
    if (!staticEdges.has(name)) staticEdges.set(name, new Set());
    staticEdges.get(name).add(m[1]);
  }
  for (const m of s.matchAll(/import\("\.\/([\w.-]+\.js)"\)/g)) {
    if (!lazyTargets.has(name)) lazyTargets.set(name, new Set());
    lazyTargets.get(name).add(m[1]);
  }
  const NAME = /"([a-z][a-z0-9.-]{2,40})"/g;
  // `const X=[...],Y=new Set(X)` (identifier between, no closing bracket)
  const SET_TABLE_RE = /\b([a-z][\w$]*)=\[("[a-z][a-z0-9.-]{2,40}"(?:,"[a-z][a-z0-9.-]{2,40}"){4,})\],[a-zA-Z_$][\w$]*=new Set\([a-zA-Z_$][\w$]*\)/g;
  for (const m of s.matchAll(SET_TABLE_RE)) {
    const names = [...m[2].matchAll(/"([a-z][a-z0-9.-]{2,40})"/g)].map((x) => x[1]);
    for (const k of names) storeNames.set(k, (storeNames.get(k) ?? 0) + 1);
    setTables.push(names);
  }
  if (!cardRegistryChunk && CARD_IDS_RE.test(s)) cardRegistryChunk = name;
  // label catalog
  for (const m of s.matchAll(/"([A-Za-z0-9+/_=-]{5,8})":\["([^"\\]{2,120})"/g)) {
    const text = m[2];
    const prev = labelCatalog.get(text);
    if (prev) prev.chunks.add(name);
    else labelCatalog.set(text, { key: m[1], chunks: new Set([name]) });
  }
}

// semantic clusters by stable chunk-name prefix (hashed suffix stripped)
function clusterOf(name) {
  const m = name.match(/^([a-zA-Z]+)-[\w-]+\.js$/);
  return m ? m[1] : "(entry)";
}
const clusters = new Map();
for (const c of chunks) {
  const k = clusterOf(path.basename(c.path));
  if (!clusters.has(k)) clusters.set(k, { chunks: [], bytes: 0 });
  const cl = clusters.get(k);
  cl.chunks.push(path.basename(c.path));
  cl.bytes += c.size;
}
for (const cl of clusters.values()) cl.chunks.sort();

// stores: recovered kv namespace allowlist
const storeKeys = [...storeNames.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([key, hits]) => ({ key, hits }));
// classified validated-string tables (each feeds `new Set`)
const kvTable = setTables.find((t) => t.includes("client-meta.account-slot")) ?? [];
const transcriptItemKinds = setTables.find((t) => t.includes("secret-request")) ?? [];

// ---------- ui evidence matrix ----------
// Surfaces -> artifact-backed labels (exact strings found in shipped bundles).
// Confidence A: exact string + catalog key + source chunk. Geometry/layout is
// NEVER claimed here (that would be visual-inference, tracked in docs/ui).
const surfaces = [
  { surface: "sidebar", labels: ["Sidebar", "Collapse sidebar", "Expand sidebar", "Resize sidebar", "Search Bots", "New section", "Rename section", "Move to section", "Section actions", "Hide from sidebar", "Show Hidden Bots", "Hidden Bots", "New Bot or Channel", "Channels", "Groups"] },
  { surface: "onboarding.tool-selector", labels: ["What do you use every day?", "Marketing Analyst", "Outreach", "QA Engineer", "Researcher", "Expense Auditor", "Win-Loss Analyst", "Meet a future teammate", "Create your first Bot", "Name your Bot", "Name a teammate and describe what they should do", "What should this Bot help with?", "Describe what your Bot does", "Create"] },
  { surface: "create-bot.avatar", labels: ["Edit Avatar", "Avatar editor", "Avatar source", "Character shape", "Shuffle", "Describe your avatar", "Describe your avatar…", "Generating avatar", "Set avatar", "Edit Bot avatar"] },
  { surface: "chat.composer", labels: ["Search", "No tools match “", "Send"] },
  { surface: "bot-details", labels: ["Bot settings", "Instructions", "Model", "Name", "Routines are recurring tasks this Bot runs on a schedule."] },
  { surface: "agent-computer", labels: ["Agent Computer", "Grok Bot's Computer", "Take over", "Open computer", "Computer preview", "Runs on your local computer", "Runs on Grok Bot's computer"] },
  { surface: "teach-a-task", labels: ["Teach a task"] },
  { surface: "routines.editor", labels: ["Routines", "Create Routine", "Routine", "Name this routine", "Triggers", "Add trigger", "Trigger fields", "Trigger source", "Back to Routines", "Available after the routine is saved", "What should this routine do each time it runs?"] },
  { surface: "plugins", labels: ["Plugins", "Plugin", "Uninstall", "Install"] },
  { surface: "settings.general", labels: ["Settings", "General", "Local tool permissions", "Local tool permission"] },
  { surface: "settings.appearance", labels: ["Appearance", "Theme", "Theme: Dark", "Theme: Light", "Theme: System", "System Default", "Light", "Dark", "System"] },
  { surface: "settings.updates", labels: ["Updates", "Check for Updates", "Restart to update", "Update ready", "New update available", "Updates follow the ", "Version "] },
  { surface: "hidden-chats", labels: ["Hidden Bots", "Show Hidden Bots", "All Bots (", "Hidden Bots stay active and keep their history, they just don't show in the sidebar.", "All bots are hidden"] },
  { surface: "org-chart", labels: ["Org chart", "Close org chart", "Org chart details", "Bot network", "No Bots yet. Create a few teammates and the network draws itself.", "Bots and groups, linked by who has messaged whom (solid) and group membership (dashed). Click a node to open it."] },
  { surface: "command-palette", labels: ["Search", "Suggestions"] },
  { surface: "approvals", labels: ["Approval needed", "Approve", "Deny", "Deny once", "Always allow", "Always allowed", "Auto-review approval"] },
  { surface: "secret-requests", labels: ["Request sent. Once the host approves, ", "Could not store the secret", "Share "] },
];

function lookupLabel(text) {
  const hit = labelCatalog.get(text);
  if (hit) return { key: hit.key, chunks: [...hit.chunks].sort() };
  // fallback: plain string literal confirmed by the vocabulary scan
  if (vocabHits[text]?.length) return { key: "(string-literal)", chunks: vocabHits[text].slice(0, 3) };
  return null;
}

const matrix = {
  schema: "grokgrok/ui-evidence-matrix@1",
  note: "Confidence A labels: exact string recovered from shipped 0.24 renderer bundles with catalog key + chunk provenance. Layout/geometry claims are excluded here; visual-inference items live in docs/ui/surface-atlas.md.",
  surfaces: surfaces.map((sf) => ({
    surface: sf.surface,
    labels: sf.labels.map((t) => {
      const hit = lookupLabel(t);
      return { text: t, confirmed: !!hit, ...(hit ? { catalogKey: hit.key, chunks: hit.chunks } : {}) };
    }),
  })),
};

// design tokens live in the CSS bundles
for (const c of cssFiles) {
  const s = fs.readFileSync(asarGet(c.path), "utf8");
  for (const m of s.matchAll(/--([a-z][a-z0-9-]{2,40}):/g)) tokens.add(m[0]);
}

const htmlPath = asarGet("dist/renderer/index.html");
const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf8") : null;

const atlas = {
  schema: "grokgrok/renderer-atlas@2",
  chunkCount: chunks.length,
  scannedBytes: [...clusters.values()].reduce((a, c) => a + c.bytes, 0),
  indexHtml: html ? { scriptRefs: [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]), cssRefs: [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]) } : null,
  largestChunks: chunks.slice().sort((a, b) => b.size - a.size).slice(0, 15).map((c) => ({ path: path.basename(c.path), bytes: c.size })),
  vocabulary: Object.fromEntries(Object.entries(vocabHits).map(([v, hits]) => [v, { confirmed: hits.length > 0, files: hits.slice(0, 3) }])),
  routes: [...routes.entries()].sort((a, b) => b[1] - a[1]).map(([r, n]) => ({ route: r, hits: n })),
  sourcePathMarkers: [...srcMarkers].sort(),
  designTokens: {
    count: tokens.size,
    sample: [...tokens].sort().slice(0, 80),
    sand: [...tokens].filter((t) => t.startsWith("--sand")).sort(),
  },
  moduleGraph: {
    staticEdgeCount: [...staticEdges.values()].reduce((a, s) => a + s.size, 0),
    lazyBoundaryCount: [...lazyTargets.values()].reduce((a, s) => a + s.size, 0),
    entryChunks: [...staticEdges.keys()].filter((k) => !staticEdges.get(k).has(k)).sort(),
    // adjacency lists (deterministic order); targets resolved within assets/
    static: Object.fromEntries([...staticEdges.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, [...v].sort()])),
    lazy: Object.fromEntries([...lazyTargets.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, [...v].sort()])),
  },
  clusters: Object.fromEntries([...clusters.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, v])),
  stores: storeKeys,
  kvNamespaces: kvTable,
  transcriptItemRegistry: {
    chunk: cardRegistryChunk,
    kinds: transcriptItemKinds,
    eventCards: ["pr-opened", "pr-pushed", "pr-merged", "review-requested", "review-approved", "review-changes-requested", "review-commented", "pr-comment", "inline-review-comment", "review-thread-resolved", "review-thread-unresolved", "issue-assigned", "ci-passed", "ci-failed"],
  },
  labelCatalogSize: labelCatalog.size,
};

fs.mkdirSync(path.join(REPO, "evidence", "generated"), { recursive: true });
fs.writeFileSync(path.join(REPO, "evidence", "generated", "renderer-atlas.json"), JSON.stringify(atlas, null, 2));
fs.writeFileSync(path.join(REPO, "evidence", "generated", "ui-evidence-matrix.json"), JSON.stringify(matrix, null, 2));
console.error(`renderer atlas: ${chunks.length} chunks, ${atlas.moduleGraph.staticEdgeCount} static edges, ${atlas.moduleGraph.lazyBoundaryCount} lazy boundaries, ${Object.keys(atlas.clusters).length} clusters, ${storeKeys.length} store keys, card registry in ${cardRegistryChunk}, ${labelCatalog.size} labels`);
console.error(`ui matrix: ${matrix.surfaces.length} surfaces`);
