#!/usr/bin/env node
// Deterministic native-ABI inventory from the unpacked app tree.
// Walks resources/app.asar.unpacked/dist/{deps,native}, classifies every
// binary payload (.node / .exe), records platform variants, checks N-API
// registration via exported symbols (nm -D when available), and mines
// wrapper-level JS API names from bundle call sites.
// Linux-port stub quarantine: Windows-only payloads shipped in this linux
// artifact are recorded but flagged platform:"win32-only" — they are inert
// on the linux runtime, not evidence of linux behaviour.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UNPACKED = path.join(REPO, ".cache", "artifact", "0.24.0", "unpacked-zip",
  "Grok_Bot_0.24.0_linux_x64", "resources", "app.asar.unpacked");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");

const walk = (dir) => {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
};

const all = fs.existsSync(UNPACKED) ? walk(UNPACKED) : [];
const modules = [];
for (const p of all) {
  const rel = path.relative(UNPACKED, p);
  const base = path.basename(p);
  const ext = path.extname(p);
  if (![".node", ".exe"].includes(ext)) continue;

  // platform triple from filename or prebuild dir
  let platform = null;
  const platMatch = rel.match(/\.(linux-x64-(?:gnu|musl)|win32-x64-msvc|darwin-(?:x64|arm64)(?:-unknown)?)\.node$/) ?? path.dirname(p).match(/(linux-x64|win32-x64|darwin-x64|darwin-arm64)$/);
  if (ext === ".exe") platform = "win32";
  else if (platMatch) platform = platMatch[1];

  const mod = {
    file: rel,
    kind: ext === ".node" ? "napi-module" : "windows-executable-helper",
    platform,
    size: fs.statSync(p).size,
    linuxRuntimeActive: ext === ".exe" ? false : !platform || platform.startsWith("linux") || platform === null,
  };

  if (ext === ".node") {
    try {
      const syms = execFileSync("nm", ["-D", "--defined-only", p], { encoding: "utf8" });
      mod.napiRegistered = /T napi_register_module_v1/.test(syms);
      mod.abiVersionProbe = /node_api_module_get_api_version_v1/.test(syms) ? "v1-capable" : "legacy";
    } catch {
      mod.napiRegistered = null; // nm unavailable or stripped
    }
    // wrapper-level API: how bundles consume it
    const pkgName = rel.includes("@anysphere/") ? "@anysphere/" + rel.split("@anysphere/")[1].split("/")[0]
      : rel.split("/")[2];
    const usage = new Set();
    for (const f of fs.readdirSync(BUNDLES)) {
      const s = fs.readFileSync(path.join(BUNDLES, f), "utf8");
      const short = base.replace(/\.(node)$/, "").replace(/-/g, "_").replace(/[.].*/, "");
      for (const m of s.matchAll(new RegExp(`\\b([a-zA-Z_$][\\w$]*)\\.((?:${short}|${pkgName.split("/").pop().replace(/-/g, "_")})[A-Za-z_]*)`, "g"))) usage.add(m[0]);
      for (const m of s.matchAll(new RegExp(`require\\("${pkgName.replace(/[/]/g, "\\/")}"\\)`, "g"))) usage.add(`require("${pkgName}")`);
    }
    if (usage.size) mod.bundleUsage = [...usage].sort();
  }
  modules.push(mod);
}
modules.sort((a, b) => a.file.localeCompare(b.file));

const out = {
  schema: "grokgrok/native-abi@1",
  artifact: "Grok_Bot_0.24.0_linux_x64",
  note: ".node modules register through N-API (napi_register_module_v1); wrapper-level JS surface recovered from bundle call sites only where minified access patterns are unambiguous. Windows-only payloads are quarantined as inert on the linux runtime.",
  totals: {
    binaries: modules.length,
    napiModules: modules.filter((m) => m.kind === "napi-module").length,
    win32Only: modules.filter((m) => m.linuxRuntimeActive === false).length,
    linuxActive: modules.filter((m) => m.linuxRuntimeActive).length,
  },
  quarantinedWin32Stubs: modules.filter((m) => !m.linuxRuntimeActive).map((m) => ({ file: m.file, reason: "win32-only payload inside linux artifact; never loaded by the linux port" })),
  modules,
};
const dest = path.join(REPO, "evidence", "generated", "native-abi.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.error(`native-abi: ${out.totals.binaries} binaries (${out.totals.napiModules} napi, ${out.totals.win32Only} win32-quarantined) -> ${path.relative(REPO, dest)}`);
