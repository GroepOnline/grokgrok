#!/usr/bin/env node
// Generate clean-room TS for the node-agent-coordinator command surface.
// Input:  .cache/artifact/0.24.0/bundles/coordinator-main.cjs (extracted from asar)
// Output: src/wire/coordinator-bridge.generated.ts + evidence/generated/coordinator-atlas.json
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");
const SRC = path.join(BUNDLES, "coordinator-main.cjs");

if (!fs.existsSync(SRC)) {
  execFileSync("node", [path.join(REPO, "scripts", "asar.mjs"), "extract", "dist/node-agent-coordinator/main.cjs", SRC], { stdio: "inherit" });
}

execFileSync("node", [path.join(REPO, "scripts", "analyze-coordinator.mjs"), SRC],
  { stdio: ["ignore", fs.openSync(path.join(REPO, "evidence", "generated", "coordinator-atlas.json"), "w"), "inherit"] });
const atlas = JSON.parse(fs.readFileSync(path.join(REPO, "evidence", "generated", "coordinator-atlas.json"), "utf8"));

// merge tables (later tables override dupes is wrong; keep first-seen with reply info if present)
const byName = new Map();
for (const table of atlas.methodTables) {
  for (const m of table) {
    const prev = byName.get(m.name);
    if (!prev || (!prev.reply && m.reply)) byName.set(m.name, m);
  }
}
const methods = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));

let ts = `// GENERATED from Grok Bot 0.24.0 dist/node-agent-coordinator/main.cjs — do not hand-edit.
// Regenerate: npm run gen:coordinator-bridge
// Frame protocol evidence and channel constants live in evidence/generated/coordinator-atlas.json.
// Clean-room reconstruction: command names, arg style, reply kinds artifact-proven; payload value types unknown.

export type ArgsStyle = "none" | "object";

export interface CoordinatorCommandInfo {
  readonly args: ArgsStyle;
  /** Reply frame kind where the protocol declares one (e.g. transcript-page). */
  readonly reply?: string;
}

export const COORDINATOR_EDGES = ${JSON.stringify(atlas.edges)} as const;

export const COORDINATOR_CHANNELS = ${JSON.stringify(atlas.channelConstants)} as const;

export const COORDINATOR_COMMANDS = {
`;
for (const m of methods) {
  ts += `  ${m.name}: { args: "${m.args}"${m.reply ? `, reply: "${m.reply}"` : ""} },\n`;
}
ts += `} as const satisfies Record<string, CoordinatorCommandInfo>;

export type CoordinatorCommand = keyof typeof COORDINATOR_COMMANDS;

/** Control-frame kinds on the coordinator-control channel. */
export const FRAME_KINDS = ${JSON.stringify(atlas.frameKinds)} as const;

/** Lifecycle phases observed in the hello/ready handshake and run states. */
export const LIFECYCLE_PHASES = ${JSON.stringify(atlas.lifecyclePhases)} as const;
`;

fs.mkdirSync(path.join(REPO, "src", "wire"), { recursive: true });
fs.writeFileSync(path.join(REPO, "src", "wire", "coordinator-bridge.generated.ts"), ts);
console.error(`wrote coordinator-bridge.generated.ts (${methods.length} commands, edges: ${atlas.edges.join(", ")})`);
