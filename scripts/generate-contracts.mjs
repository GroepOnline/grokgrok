#!/usr/bin/env node
// Generate clean-room TypeScript contracts from the deterministic atlases.
// Inputs:  evidence/generated/{services-atlas,feature-gates,mcp-skills-atlas,native-abi}.json
// Output:  src/wire/subsystems.generated.ts (one committed module)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN = path.join(REPO, "evidence", "generated");
const load = (f) => {
  const p = path.join(GEN, f);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
};

const services = load("services-atlas.json");
const gates = load("feature-gates.json");
const mcp = load("mcp-skills-atlas.json");
const native = load("native-abi.json");

if (!services || !gates || !mcp || !native) {
  console.error("atlases missing; run scripts/analyze-*.mjs first (requires artifact cache)");
  process.exit(1);
}

const q = (s) => JSON.stringify(s);
let ts = `// GENERATED from Grok Bot 0.24.0 shipped-bundle atlases — do not hand-edit.
// Regenerate: npm run gen:contracts (requires local artifact cache)
// Every name below is string-proven in the shipped bundles. Presence is
// capability evidence only; behavioural semantics live in docs/subsystems/.

export interface ServiceMethod {
  readonly rpcName: string;
  readonly kind: "Unary" | "ServerStreaming" | "ClientStreaming" | "BiDiStreaming";
}

export interface ProtoService {
  readonly service: string;
  readonly bundle: string;
  readonly methods: Readonly<Record<string, ServiceMethod>>;
}

/** ConnectRPC service tables recovered from shipped bundles (${services.totalServices} services, ${services.totalMethods} methods). */
export const SERVICES: readonly ProtoService[] = ${JSON.stringify(services.services, null, 2)};

export const SERVICE_NAMES = [
${services.services.map((s) => `  ${q(s.service)},`).join("\n")}
] as const;

export type ServiceName = (typeof SERVICE_NAMES)[number];

/** SAND_* environment vocabulary: config knobs grouped by prefix semantics. */
export const FEATURE_GATE_GROUPS: Readonly<Record<string, readonly string[]>> = ${JSON.stringify(Object.fromEntries(Object.entries(gates.groups).map(([k, v]) => [k, v])), null, 2)};

export const FEATURE_GATE_ENUM_MEMBERS: readonly string[] = ${JSON.stringify(gates.enumMembers.sort(), null, 2)};

export const FEATURE_GATE_MECHANISM = ${JSON.stringify(gates.mechanism, null, 2)} as const;

/** MCP/skills/plugins contract surface (artifact-proven keys and commands). */
export const MCP_CONTROL_SERVICE_METHODS = [
${mcp.skillsPlugins.controlServiceMethods.map((m) => `  ${q(m)},`).join("\n")}
] as const;

export const MCP_COORDINATOR_COMMANDS = [
${mcp.skillsPlugins.coordinatorCommands.map((m) => `  ${q(m)},`).join("\n")}
] as const;

export const SKILL_PLUGIN_PATHS = [
${mcp.skillsPlugins.paths.map((m) => `  ${q(m)},`).join("\n")}
] as const;

/** Native module inventory (N-API modules; win32-only payloads quarantined). */
export interface NativeModuleInfo {
  readonly file: string;
  readonly kind: string;
  readonly platform: string | null;
  readonly linuxRuntimeActive: boolean;
  readonly napiRegistered?: boolean;
}

export const NATIVE_MODULES: readonly NativeModuleInfo[] = ${JSON.stringify(native.modules.map(({ file, kind, platform, linuxRuntimeActive, napiRegistered }) => ({ file, kind, platform, linuxRuntimeActive, napiRegistered })), null, 2)};
`;

fs.mkdirSync(path.join(REPO, "src", "wire"), { recursive: true });
fs.writeFileSync(path.join(REPO, "src", "wire", "subsystems.generated.ts"), ts);
console.error(`wrote src/wire/subsystems.generated.ts (${services.totalServices} services, ${gates.totals.distinctSandNames} SAND_*, ${native.totals.binaries} native binaries)`);
