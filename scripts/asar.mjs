#!/usr/bin/env node
// Extract named files out of the cached asar for analysis.
//   node scripts/asar.mjs list [prefix]
//   node scripts/asar.mjs get <inner-path>            -> stdout
//   node scripts/asar.mjs extract <inner-path> <dest>
import fs from "node:fs";
import path from "node:path";
import { readAsarHeader, walkFiles, extractFile } from "./lib/asar.mjs";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = fs.existsSync(path.join(REPO, ".cache", "artifact", "0.24.0")) ? "0.24.0" : null;
if (!version) { console.error("run npm run ingest first"); process.exit(1); }
const asar = path.join(REPO, ".cache", "artifact", version, "app.asar");

const [cmd, ...rest] = process.argv.slice(2);
const buf = fs.readFileSync(asar);
const { header, contentBase } = readAsarHeader(buf);

if (cmd === "list") {
  const prefix = rest[0] ?? "";
  for (const f of walkFiles(header)) {
    if (f.path.startsWith(prefix)) console.log(`${String(f.size).padStart(10)}  ${f.path}`);
  }
} else if (cmd === "get") {
  extractFile(asar, rest[0], "/dev/stdout");
} else if (cmd === "extract") {
  const dest = rest[1];
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  extractFile(asar, rest[0], dest);
  console.error(`extracted ${rest[0]} -> ${dest}`);
} else {
  console.error("usage: asar.mjs list [prefix] | get <path> | extract <path> <dest>");
  process.exit(1);
}
