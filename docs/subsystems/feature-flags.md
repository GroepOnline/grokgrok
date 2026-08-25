# Feature flags / dynamic config

**Evidence:** electron-main.cjs + host-main.cjs — confidence B.

## Mechanism

- Statsig-backed: endpoints `https://featureassets.org/v1` (fetch) and
  `https://statsigapi.net/v1/sdk_exception`; strings `experiment_name`,
  `use_experimental_model_opt_out`, `trace_flags`.
- Desktop surface: `getExperimentsSnapshot`, `applyFeatureFlagOverride`, `refreshFeatureFlags`;
  host env `SAND_FEATURE_GATE_OVERRIDES` and `SAND_MODEL_EXPERIMENT_OVERRIDE`.
- **Important:** a gate being bundled in the client does NOT imply it is remotely enabled.
  Bundled names are capability evidence only.

## Grok-specific vs shared-platform knobs

| Class | Examples |
| --- | --- |
| Grok Bot product | SAND_AGENT_MOCK_RESPONSE, SAND_SPOTLIGHT, SAND_MULTITASK, SAND_LAB, SAND_MEMORY_* (episode/extraction/synthesis), SAND_TRUSTED_AUTOMATION_PROMPT, SAND_HIDDEN_PROMPT, SAND_CODING_SUBAGENT |
| Shared platform (Cursor/Anysphere lineage) | use_experimental_model_opt_out, llm_gateway, client_llm_gateway_credential, codebase telemetry paths (/var/lib/sand/telemetry/codebase) |
| Ops/deploy knobs | SAND_BACKEND_URL, SAND_GATEWAY_BIND_HOST/_TOKEN/_TLS_*, SAND_BOX_STORE_*, SAND_HOST_IN_BOX, SAND_PACKAGED |

Full env-flag inventory: `evidence/generated/host-atlas.json` (`envFlags`) and
`evidence/generated/coordinator-atlas.json` (`envFlags`).

## Recovered registry (0.24.0, wave 2)

Full machine-readable extraction: `evidence/generated/feature-registry.json`
(`scripts/analyze-features.mjs`; provenance recorded inside).

| Surface | Count | Evidence |
| --- | --- | --- |
| `checkGate()` call sites (hard-coded gates) | 3 | electron-main `sand_multi_machine_local_exec`; host-main `sand_action_audit_logs`, `sand_new_transcript_journal` |
| Dynamic-config keys with zod schemas in client | 130 | host-main + electron-main registries (`<key>:y.object({...})`) |
| Grok Bot product keys (`sand_*` / `grok_*`) | 14 | e.g. sand_browser_use_model, sand_computer_use_playwright_config, sand_rpc_tracing, sand_min_client_version, grok_bot_conversation_size_limits |
| Shared platform keys (Cursor/Anysphere lineage) | 116 | e.g. composer_hang_detection_config, mcp_oauth_refresh_policy, glass_* UI configs |

**Confidence:** A for the 130 key names + zod value shapes (schema literals in bundle);
B for gate list completeness (minified indirection could hide additional call sites).
Minification may split names across string concatenation; a handful of keys show this
artifact and are marked as-is. Presence = bundled capability, not enabled assignment.
