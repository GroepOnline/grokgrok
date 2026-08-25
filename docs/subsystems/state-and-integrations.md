# Host/state contracts & integrations (wave 2 deepening)

**Evidence:** shipped host-main.cjs + electron-main.cjs string/structure extraction.
Confidence marked per section. Companion to `host-and-box.md` and `security-model.md`.

## Agent Store vs Sandbox Store (confidence A for separation, B for sync semantics)

Two distinct durable planes, deliberately separated:

| | Agent Store | Sandbox (Box) Store |
| --- | --- | --- |
| Contents | agents, messages, media, transcript mirror | box images / filesystem packs |
| Workers | agent-store-worker.cjs, transcript-mirror-worker.cjs | box-store-vacuum-worker.cjs |
| Concurrency primitives | AgentStoreFileLock, AgentStoreMultipartWrites, AgentStoreConflictNotices/Args/Result | multipart upload failure-code taxonomy (checksum-mismatch, precondition-failed, …) |
| Backing | better-sqlite3 (`agents/messages/media/transcript_entries`) + per-agent DBs (`AgentStoreDbs`, `AgentStores`) | object-store-backed image pipeline (`SAND_BOX_STORE_*`) |

Skills dirs hang off the agent store: `agentStoreSkillsDirs`, merged via a
`merged-agent-skills` service that layers plugin skills over base skills.

## Local-tool permission precedence (confidence A)

Recovered verbatim from electron-main.cjs:

```text
rank = { never: 0, ask: 1, always: 2 }
effective(permission, ceiling) = ceiling == null ? permission : min-rank(permission, ceiling)
```

- The **ceiling can only restrict**, never elevate: effective = lower of the two ranks.
- User choice persists in `local-tool-permissions.json`; approvals log to
  `local-tool-approvals.json` with per-key promise serialization (single-flight map).
- RPC surface: get/setLocalToolPermission, getLocalToolPermissionCeiling,
  recordLocalToolApproval ("needs its request id and action.").

## Skills / plugin roots (confidence A — literal registry)

Skill source directories scanned by the host:

| configDir | subdir | flags |
| --- | --- | --- |
| `.cursor` | `skills-cursor` | builtin, not third-party |
| `.claude` | `skills` | third-party |
| `.codex` | `skills` | third-party |
| `.grok` | `skills` | third-party |
| `.agents` | `skills` | non-third-party |
| `.cursor` | `skills` | non-third-party |

Host-protected stores (writes refused from outside the host):
`agents, user-memory, projects, workflows, plugins, managed-skills`.
Plugin skill lifecycle events: `sand-plugin-skills-refresh`, `sand-plugin-skills-change`,
`sand-managed-skills-change`. Coordinator side: skillsCatalog, syncPluginSkills,
publishSkill/resyncPublishedSkill/unpublishSkill.

## MCP lifecycle / OAuth / tool-disable (confidence B+)

- Per-server state vocabulary: mcpServers, mcpDescriptors, mcpTools, mcpInfoComplete,
  mcpMode (telemetry dimension `mcp_mode`), calledWithoutReadDef.
- Tool disablement is per-server: `mcpDisabledToolsByServerId`; custom instructions are
  per-server and account-scoped (`mcpCustomInstructionsByServerId`,
  `mcpCustomInstructionsAccountScope`).
- OAuth knobs (dynamic-config): `mcp_oauth_refresh_policy`, `mcp_oauth_loopback_redirect`,
  `mcp_oauth_backend_redis_lock_config`, `mcp_oauth_sweep_config`;
  `github_oauth_client_id` + `force_oauth` literals present.

## Automations & memory pipeline (confidence B)

- Automations CRUD + run-now + enable flag + webhook credential (see coordinator.md);
  triggers split schedule vs event.
- Memory pipeline env gates: SAND_MEMORY_EPISODE(+_INTERVAL), SAND_MEMORY_EXTRACTION,
  SAND_MEMORY_SYNTHESIS(_V, _VERIFICATION_V); freeze switch SAND_DISABLE_MEMORY_FREEZE;
  user-memory is a protected store.

## VNC / presence (confidence B)

vncUrl/vncUrls handed to renderer; main→renderer event `vnc-user-presence`;
novnc port token versioning appears inside sand_min_client_version
(`novnc_port_token_min_version`).

## Inference / model selection (confidence B)

- Credential renewal: SAND_INFERENCE_RENEWAL_CREDENTIAL, SAND_DEV_INFERENCE_TOKEN_FILE;
  egress modes UNSPECIFIED / DEFAULT_WITH_NETWORK_SETTINGS / NETWORK_SETTINGS_ONLY /
  ALLOW_ALL bound what credentials may reach.
- Selection: dynamic-config `sand_model_selection` / `sand_default_model` /
  `sand_automations_model` / `sand_browser_use_model`; `modelSelectionHistory` tracked;
  `use_experimental_model_opt_out` shared-platform gate; experiment override
  SAND_MODEL_EXPERIMENT_OVERRIDE; feature-gate overrides via SAND_FEATURE_GATE_OVERRIDES.
