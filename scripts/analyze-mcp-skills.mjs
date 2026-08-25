#!/usr/bin/env node
// Deterministic MCP / skills / plugins atlas from shipped bundles.
// Mines vocabulary, auth contracts, tool-disable contracts, filesystem-sync
// lease semantics, and per-tool failure-isolation telemetry labels.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLES = path.join(REPO, ".cache", "artifact", "0.24.0", "bundles");
const FILES = ["host-main.cjs", "electron-main.cjs", "local-exec-daemon.cjs", "coordinator-main.cjs"];

const readAll = () => {
  const out = {};
  for (const f of FILES) {
    const p = path.join(BUNDLES, f);
    if (fs.existsSync(p)) out[f] = fs.readFileSync(p, "utf8");
  }
  return out;
};
const bundles = readAll();

// vocabulary mining helper
const mine = (re) => {
  const acc = new Map();
  for (const [file, s] of Object.entries(bundles)) {
    for (const m of s.matchAll(re)) {
      const k = m[0];
      const e = acc.get(k) ?? new Set();
      e.add(file);
      acc.set(k, e);
    }
  }
  return Object.fromEntries([...acc.entries()].sort().map(([k, v]) => [k, [...v].sort()]));
};

// 1. state keys + config surfaces
const stateKeys = mine(/mcp(?:Servers|Descriptors|Tools|MetaToolOptions|CustomInstructions(?:ByServerId|AccountScope)?|FileSystemOptions|Arguments|DisabledToolsByServerId|BoxServers|Lease|StateAccessor|AuthPath|AuthPromise|AuthCopyOverrides|Source|mcp_version|mcp_mode|s|_servers)/g);

// 2. OAuth/auth contract vocabulary (artifact-proven identifiers only)
const authVocabulary = mine(/OAuthAccount|OAuthTokens?Response|OAuthPendingState|oauthRedirectUri|oauth_redirect_uri|token_endpoint(?:_auth_(?:signing_alg_values_supported|methods_supported))?|\/oauth-authz-req|mcpAuthToolCall|mcpAuthRequestResponse|mcpAuthRequestQuery|mcpAuthCompletion/g);

// 3. failure isolation: per-call telemetry with failure_reason/retryable labels
const telemetryLabels = mine(/mcp\.meta\.[a-z_]+/g);
const failureTaxonomy = {};
for (const [file, s] of Object.entries(bundles)) {
  for (const m of s.matchAll(/labelNames:\[([^\]]*mcp[^\]]*)\]/g)) {
    (failureTaxonomy[m[1]] ??= new Set()).add(file);
  }
}

// 4. filesystem sync / lease semantics (single-writer coordination evidence)
const leaseEvidence = mine(/mcpLease\.onDidChange|pendingLeaseChangeEvent|lastDivergenceCheckMs|divergence_type|mcp\.filesystem\.sync_check\.[a-z_]+/g);

// 5. skills/plugins surface
const skillsVocab = mine(/agentSkills|durableSkillBlocks|pluginSkills|skillRelativePath|skillsCatalog|syncPluginSkills|getPluginSyncStatus|getSkillPublishTargets|publishSkill|resyncPublishedSkill|unpublishSkill|portAgentLocalSkills|sparsePluginClones|pluginDbId|installPluginArtifact|reloadPlugins|reloadAgentSkills/g);
const skillPaths = mine(/\.cursor\/skills[a-z-]*|\.cursor\/plugins|\.cursor\/agents|\.cursor\/commands|\.cursor\/rules|\.cursor\/worktrees|agent-skills/g);

const out = {
  schema: "grokgrok/mcp-skills@1",
  artifact: "Grok_Bot_0.24.0_linux_x64",
  note: "Names are artifact-proven string evidence. Semantics marked as reading are confidence B unless stated otherwise.",
  contracts: {
    serverConfigSources: {
      telemetryLabel: "mcp_source",
      note: "Label proven in mcp.filesystem.* metrics; its value vocabulary is NOT recoverable from the client. Candidate scope literals user/team/account/box/local exist elsewhere as config-scope strings (HYPOTHESIS C for the mapping).",
    },
    toolDisable: {
      key: "mcpDisabledToolsByServerId",
      reading: "Per-server disable lists keyed by server id; disabling is scoped to a server, not global. Confidence B.",
    },
    customInstructions: {
      scopes: ["per-server", "account-scope", "by-server-id"],
      keys: ["mcpCustomInstructions", "mcpCustomInstructionsByServerId", "mcpCustomInstructionsAccountScope"],
    },
    auth: {
      flow: "OAuth-style authorization-code with discovery (token_endpoint metadata incl. PKCE signing-alg negotiation strings)",
      vocabulary: Object.keys(authVocabulary),
      handoff: ["submitSecret (coordinator)", "setBoxSecrets/getBoxSecretsStatus (host/box)", "GetMcpRefreshTokens (ControlService)"],
    },
    failureIsolation: {
      evidence: "Per-tool-call telemetry carries failure_reason and retryable labels (mcp.meta.call_tool_*); get_tools/call_tool/fetch_resource each have separate success/error/duration series.",
      reading: "Failures are recorded per call with retryability classified; no cross-server crash propagation is visible at the telemetry boundary. Confidence B.",
      labelSets: Object.fromEntries(Object.entries(failureTaxonomy).map(([k, v]) => [k, [...v].sort()])),
    },
    filesystemSync: {
      mechanism: "lease-based single-writer sync of expected-vs-actual MCP servers on disk",
      evidence: Object.keys(leaseEvidence),
      metrics: ["expected servers", "actual servers", "synced", "divergence_type"],
    },
  },
  skillsPlugins: {
    vocabulary: Object.keys(skillsVocabularyFixup(skillsVocab)),
    paths: Object.keys(skillPaths),
    controlServiceMethods: ["ReloadAgentSkills", "ReloadPlugins", "InstallPluginArtifact", "LoadMcpServers", "GetMcpRefreshTokens"],
    coordinatorCommands: ["skillsCatalog", "syncPluginSkills", "getPluginSyncStatus", "publishSkill", "resyncPublishedSkill", "unpublishSkill", "portAgentLocalSkills", "refreshMcp", "listBoxMcpServers"],
  },
  vocabularies: {
    stateKeys: Object.keys(stateKeys),
    telemetryLabels: Object.keys(telemetryLabels),
  },
};

function skillsVocabularyFixup(v) { return v; }

const dest = path.join(REPO, "evidence", "generated", "mcp-skills-atlas.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.error(`mcp-skills-atlas: ${Object.keys(stateKeys).length} state keys, ${Object.keys(telemetryLabels).length} telemetry labels -> ${path.relative(REPO, dest)}`);
