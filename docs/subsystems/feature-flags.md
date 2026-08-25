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

Full inventory: `evidence/generated/feature-gates.json` (212 distinct `SAND_*` names across
bundles = 163 config knobs + 49 enum members, grouped by prefix semantics, with per-bundle
provenance) and `evidence/generated/host-atlas.json` (`envFlags`),
`evidence/generated/coordinator-atlas.json` (`envFlags`). Committed contract:
`src/wire/subsystems.generated.ts` (`FEATURE_GATE_GROUPS`, `FEATURE_GATE_ENUM_MEMBERS`).

Knob groups (counts from the atlas): product-misc 83, box-store 13, kill-switches 13
(`SAND_DISABLE_MEMORY_FREEZE`, `SAND_DISABLE_RUN_SCHEDULER`, …), dev-only 13, access-paywall 8,
host-local-exec 11, computers 6, agent-memory-pipeline 5, gateway 5, egress-tunnel 5,
trial-claims 1.

Version-diff hook: after ingesting a future artifact, run
`node scripts/diff-version.mjs <old-generated-dir>` for a machine-readable gate delta.
