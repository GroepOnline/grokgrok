#!/usr/bin/env node
// Reproducible artifact ingest for Grok Bot 0.24.
//
// Usage:
//   node scripts/ingest.mjs [--zip PATH] [--inventory-only]
//
// Env overrides:
//   GROK_BOT_ZIP     path to shipped zip (default: searches common locations)
//   GROKGROK_CACHE   cache dir (default: <repo>/.cache/artifact)
//
// Outputs (all gitignored, reproducible):
//   .cache/artifact/<version>/app.asar            extracted asar
//   .cache/artifact/<version>/app.asar.unpacked/  extracted unpacked dir
//   evidence/generated/ingest.json                machine-readable provenance + file inventory
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readAsarHeader, walkFiles } from "./lib/asar.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const argValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const CANDIDATES = [
  process.env.GROK_BOT_ZIP,
  argValue("--zip"),
  path.join(REPO, "..", "..", "Grok_Bot_0.24.0_linux_x64.zip"),
  path.join(process.env.HOME ?? "", "Documents", "Grok_Bot_0.24.0_linux_x64.zip"),
].filter(Boolean);

const zipPath = CANDIDATES.find((p) => fs.existsSync(p));
if (!zipPath) {
  console.error("No Grok Bot zip found. Set GROK_BOT_ZIP or pass --zip PATH.");
  process.exit(1);
}

const EXPECTED_SHA256 = "8d14c2bcecafe2f4dac4a90d9842bd94642851ee60de778ca614bfb11af53177";

// 1. verify SHA-256
console.error(`hashing ${zipPath} ...`);
const hash = createHash("sha256");
for await (const chunk of fs.createReadStream(zipPath)) hash.update(chunk);
const sha256 = hash.digest("hex");
if (sha256 !== EXPECTED_SHA256) {
  console.error(`SHA-256 mismatch:\n  got      ${sha256}\n  expected ${EXPECTED_SHA256}`);
  process.exit(1);
}
console.error(`sha256 ok: ${sha256.slice(0, 16)}…`);

const versionMatch = path.basename(zipPath).match(/Grok_Bot_([\d.]+)_/);
const version = versionMatch?.[1] ?? "unknown";

const cacheRoot = process.env.GROKGROK_CACHE ?? path.join(REPO, ".cache", "artifact");
const cacheDir = path.join(cacheRoot, version);
fs.mkdirSync(cacheDir, { recursive: true });

const asarDest = path.join(cacheDir, "app.asar");
const unzipDir = path.join(cacheDir, "unpacked-zip");

if (!flag("--inventory-only")) {
  // 2. extract only resources/ members we need (asar + unpacked tree), not binaries
  if (!fs.existsSync(asarDest)) {
    console.error("extracting resources/app.asar ...");
    fs.writeFileSync(asarDest, execFileSync("unzip", ["-p", zipPath, "Grok_Bot_" + version + "_linux_x64/resources/app.asar"], { maxBuffer: 1 << 30 }));
  }
  if (!fs.existsSync(path.join(unzipDir, "Grok_Bot_" + version + "_linux_x64", "resources", "app.asar.unpacked"))) {
    console.error("extracting app.asar.unpacked tree ...");
    execFileSync("unzip", ["-q", "-o", zipPath, "*app.asar.unpacked*", "-d", unzipDir], { stdio: "inherit" });
  }
  console.error(`cache ready: ${cacheDir}`);
}

// 3. inventory
const buf = fs.readFileSync(asarDest);
const { header, contentBase } = readAsarHeader(buf);
const files = [...walkFiles(header)].map((f) => ({
  path: f.path,
  size: f.size,
  offset: f.offset === null || Number.isNaN(f.offset) ? null : contentBase + f.offset,
  unpacked: f.unpacked,
}));

const byTop = {};
for (const f of files) {
  const top = f.path.split("/").slice(0, 2).join("/");
  byTop[top] = (byTop[top] ?? 0) + f.size;
}

const genDir = path.join(REPO, "evidence", "generated");
fs.mkdirSync(genDir, { recursive: true });
const inventory = {
  schema: "grokgrok/ingest@1",
  generatedAt: new Date().toISOString(),
  artifact: {
    name: path.basename(zipPath),
    version,
    sha256,
    sha256MatchesExpected: true,
    expectedSha256: EXPECTED_SHA256,
  },
  counts: {
    totalFiles: files.length,
    totalBytes: files.reduce((a, f) => a + f.size, 0),
    unpackedFiles: files.filter((f) => f.unpacked).length,
  },
  largestBundles: Object.entries(byTop).sort((a, b) => b[1] - a[1]).slice(0, 40)
    .map(([prefix, bytes]) => ({ prefix, bytes })),
  files,
};
fs.writeFileSync(path.join(genDir, "ingest.json"), JSON.stringify(inventory, null, 2));
console.error(`inventory written: evidence/generated/ingest.json (${files.length} files)`);
