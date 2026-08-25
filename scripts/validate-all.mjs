#!/usr/bin/env node
// Run all deterministic validators.
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validators = ["validate-main-rpc.mjs", "validate-claims.mjs", "validate-ui.mjs"]; // extend as subsystems land
for (const v of validators) {
  console.error(`\n== ${v}`);
  try {
    execFileSync("node", [path.join(REPO, "scripts", v)], { stdio: "inherit" });
  } catch {
    process.exitCode = 1;
  }
}
