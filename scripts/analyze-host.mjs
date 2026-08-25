#!/usr/bin/env node
// Deterministic host-plane atlas from dist/host/host-main.cjs (+ workers).
// Output -> evidence/generated/host-atlas.json
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");
const HOST = path.join(BUNDLES, "host-main.cjs");

if (!fs.existsSync(HOST)) {
  execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", "dist/host/host-main.cjs", HOST], { stdio: "inherit" });
}
const s = fs.readFileSync(HOST, "utf8");

const grab = (re, map = (m) => m[0]) => {
  const out = new Map();
  for (const m of s.matchAll(re)) {
    const k = map(m);
    out.set(k, (out.get(k) ?? 0) + 1);
  }
  return [...out.entries()];
};

// SQLite schema hints
const tables = [...new Set([...s.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?([a-zA-Z_][\w]*)/gi)].map((m) => m[1]))];
const columns = {};
for (const m of s.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?(\w+)\s*\(([\s\S]{0,600}?)\)/g)) {
  columns[m[1]] = [...m[2].matchAll(/([a-zA-Z_]\w+)/g)].map((x) => x[1]).slice(0, 25);
}

// subsystem vocabulary
const VOCAB = ["SandBox","BoxStore","agent-store","transcript-mirror","ControlService","computer-use",
  "forever-box","box-store-sync","content-search","egress","webauthn","VNC","vnc","sandbox",
  "local-exec-daemon","gateway","inference-credential"];
const vocab = Object.fromEntries(VOCAB.map((v) => [v, (s.match(new RegExp(v.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g")) || []).length]));

// endpoints & sockets
const endpoints = grab(/"\/(?:sand|sand-box|sand-data|sand-host|workspace|preview)[a-z/-]*"/g);
const sockets = grab(/[a-z0-9-]+\.sock\b/g);
const urls = grab(/https:\/\/[a-z0-9.-]+[a-z0-9/._-]*/g);

// env flags
const env = [...new Set([...s.matchAll(/\b(SAND_[A-Z_]+)/g)].map((m) => m[1]))].sort();

// worker files inventory
const inv = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "ingest.json"), "utf8"));
const workers = inv.files.filter((f) => f.path.includes("worker")).map((f) => f.path);

console.log(JSON.stringify({
  schema: "grokgrok/host-atlas@1",
  sqliteTables: tables,
  tableColumns: columns,
  vocabulary: Object.fromEntries(Object.entries(vocab).sort((a, b) => b[1] - a[1])),
  endpoints: endpoints.sort((a, b) => b[1] - a[1]),
  sockets,
  externalUrls: urls.filter(([u]) => !u.includes("googleapis")).sort((a, b) => b[1] - a[1]),
  googleOAuthScopes: urls.filter(([u]) => u.includes("googleapis")).map(([u]) => u),
  envFlags: env,
  workers,
}, null, 2));
