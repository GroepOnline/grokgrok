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
