#!/usr/bin/env node
// Renderer topology deep-scan: authored source-path → chunk map, lazy boundaries,
// transcript-card registry, semantic anchors, chunk import graph.
// Sources: vite module maps embedded in the entry chunk (YZn/ZZn/XZn = entrypoints,
// ozn/lzn = transcript cards), plus import() edges across all chunks.
// Output -> evidence/generated/renderer-topology.json (gitignored)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(REPO, ".cache", "artifact", "0.24.0");
const ENTRY_CHUNK = "index-Bbahbz13.js";

function asarGet(inner) {
  const out = path.join(CACHE, "renderer", inner);
  if (!fs.existsSync(out)) {
    execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", inner, out], { stdio: "inherit" });
  }
  return out;
}

const inventory = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
const chunkFiles = new Set(inventory.files.filter((f) => f.path.startsWith("dist/renderer/assets/") && f.path.endsWith(".js")).map((f) => path.basename(f.path)));

const entrySrc = fs.readFileSync(asarGet(`dist/renderer/assets/${ENTRY_CHUNK}`), "utf8");

/** extract a `X=Object.assign({...})` module map's keys and lazy chunk refs */
function extractModuleMap(varName) {
  const i = entrySrc.indexOf(`${varName}=Object.assign({`);
  if (i < 0) return null;
  const objStart = entrySrc.indexOf("{", i);
  let d = 0, end = -1;
  for (let j = objStart; j < entrySrc.length; j++) {
    if (entrySrc[j] === "{") d++;
    else if (entrySrc[j] === "}") { d--; if (d === 0) { end = j; break; } }
  }
  const body = entrySrc.slice(objStart + 1, end);
  // strings followed by either an identifier (eager) or ()=>rn(()=>import("./x.js") (lazy)
  const entries = [];
  for (const m of body.matchAll(/"([^"]+\.(?:ts|tsx|css))":([^,{]*(?:\{[^{}]*\})?)/g)) {
    const srcPath = m[1];
    const val = m[2];
    const lazy = [...val.matchAll(/import\("\.\/([^"]+\.js)"\)/g)].map((x) => x[1]);
    entries.push({ sourcePath: srcPath, mode: lazy.length ? "lazy" : "eager", chunks: lazy });
  }
  return entries;
}

const entrypointModules = [
  ...(extractModuleMap("YZn") ?? []).map((e) => ({ ...e, kind: "entrypoint", eagerSet: true })),
  ...(extractModuleMap("ZZn") ?? []).map((e) => ({ ...e, kind: "entrypoint", eagerSet: false })),
  ...(extractModuleMap("XZn") ?? []).map((e) => ({ ...e, kind: "view", eagerSet: false })),
];
const cardModules = [
  ...(extractModuleMap("ozn") ?? []).map((e) => ({ ...e, kind: "card-definition", eagerSet: true })),
  ...(extractModuleMap("lzn") ?? []).map((e) => ({ ...e, kind: "card-view", eagerSet: false })),
];

// surface ids + entrypoint framework declaration (semantic anchors)
const surfaces = [];
const surfaceIds = {};
{
  const i = entrySrc.indexOf('aa={');
  if (i >= 0) {
    const m = entrySrc.slice(i, i + 600).match(/aa=\{([^}]+)\}/);
    if (m) for (const kv of m[1].matchAll(/(\w+):"([^"]+)"/g)) surfaceIds[kv[1]] = kv[2];
  }
}
const boundaryConfig = (() => {
  const m = entrySrc.match(/\w+=\{declaration:"entrypoint\.ts",eagerBoundaries:\[([^\]]*)\],lazyViews:\[([^\]]*)\]\}/);
  if (!m) return null;
  return {
    declaration: "entrypoint.ts",
    eagerBoundaries: [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
    lazyViews: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  };
})();

// chunk import graph across ALL chunks: static + dynamic edges
const graph = {};
for (const name of chunkFiles) {
  const s = fs.readFileSync(asarGet(`dist/renderer/assets/${name}`), "utf8");
  const imports = new Set();
  for (const m of s.matchAll(/from?"\.\/([\w-]+-[A-Za-z0-9_-]{8}\.js)"/g)) imports.add(m[1]);
  const dynamicImports = [...s.matchAll(/import\("\.\/([\w-]+-[A-Za-z0-9_-]{8}\.js)"\)/g)].map((m) => m[1]);
  graph[name] = { staticImports: [...imports], dynamicImports: [...new Set(dynamicImports)] };
}

// pair card definitions with their views by directory
const cardsByDir = {};
for (const c of cardModules) {
  const dir = c.sourcePath.replace(/\/[^/]+$/, "");
  (cardsByDir[dir] ||= {}).dir = dir;
  cardsByDir[dir][c.kind] = c;
}
const transcriptCards = Object.values(cardsByDir).map(({ dir, ...rest }) => ({
  featurePath: dir.replace("/src/electron-renderer/features/", ""),
  definitionMode: rest["card-definition"]?.mode,
  viewChunk: rest["card-view"]?.chunks[0],
  viewMode: rest["card-view"]?.mode,
}));

const entrypoints = {};
for (const e of [...entrypointModules]) {
  const dir = e.sourcePath.replace(/\/(entrypoint|view|layout|loading|error)\.(tsx|ts)$/, "");
  (entrypoints[dir] ||= { dir: dir.replace("./features/", ""), entrypoints: [], views: [] });
  if (e.kind === "entrypoint") entrypoints[dir].entrypoints.push({ mode: e.mode, chunks: e.chunks });
  else entrypoints[dir].views.push({ file: e.sourcePath.split("/").pop(), mode: e.mode, chunks: e.chunks });
}

const result = {
  schema: "grokgrok/renderer-topology@1",
  generatedAt: new Date().toISOString(),
  provenance: {
    method: "vite module-map extraction (Object.assign glob maps) + import-edge scan over all chunks",
    entryChunk: ENTRY_CHUNK,
    caveat: "chunk hashes are build-specific; source paths are authored and stable",
  },
  counts: {
    entrypointDirs: Object.keys(entrypoints).length,
    transcriptCards: transcriptCards.length,
    chunks: chunkFiles.size,
    graphEdges: Object.values(graph).reduce((a, g) => a + g.staticImports.length + g.dynamicImports.length, 0),
    dynamicBoundaries: Object.values(graph).reduce((a, g) => a + g.dynamicImports.length, 0),
  },
  entrypointFramework: boundaryConfig,
  semanticAnchors: { surfaceIds },
  entrypoints: Object.fromEntries(Object.entries(entrypoints).map(([k, v]) => [v.dir, v])),
  transcriptCards: transcriptCards.sort((a, b) => a.featurePath.localeCompare(b.featurePath)),
  chunkGraph: graph,
};

fs.writeFileSync(path.join(REPO, "evidence", "generated", "renderer-topology.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result.counts));
