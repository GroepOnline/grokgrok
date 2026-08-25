# grokgrok

Clean-room reconstruction and architecture atlas for **Grok Bot 0.24** (the xAI/SpaceXAI
"Grok Bot" desktop agent). Everything here is derived from evidence in the shipped,
SHA-256-verified artifact plus labelled lineage/analogue sources — never from copying
proprietary code or prompt prose.

## What is recovered vs reconstructed vs unknown

| Status | Meaning | Where |
| --- | --- | --- |
| **Recovered (A/B)** | Direct string/structure proof from the shipped 0.24 artifact | `evidence/generated/*.json`, `src/wire/*.generated.ts` |
| **Reconstructed (clean-room)** | Typed interfaces/docs written by us from that proof; names are ours unless artifact-preserved | `src/wire/`, `docs/subsystems/`, `docs/ui/` |
| **Hypothesis (C–F)** | Explicitly labelled, never presented as fact | `evidence/curated/*.md`, `claims/ledger.json` |
| **Unknown / not claimed** | Coordinator system prompt prose, unproven payload value types, remote gate states | — |

Key recovered facts so far:

- App package `sand`, productName "Grok Bot", built on an `@anysphere/*` workspace stack.
- Renderer↔main **dune-rpc** protocol: exactly **145 methods**, probe/envelope semantics,
  trust policy, two preload bindings (`desktop`, `coordinatorPort`), 29 broadcast events.
- **node-agent-coordinator**: 103 typed commands (agents, rooms, workflows, teach recording,
  automations, skills, forever-box), frame lifecycle `welcome→hello` with protocolVersion.
- Host plane: SQLite schema (agents/messages/media/blobs/transcript_entries/kv/…),
  SandBox run/migration/upgrade state machines, egress modes, paywall/access enums.
- Renderer: page-stack navigation (no URL router), `--sand-*` design tokens.
- **Protobuf atlas** (wave 2): 43 messages / 7 enums / 3 collector services / 161 fields
  (OpenTelemetry export wire format; the only protobuf surface in the bundles) — zero unresolved fields.
- **Dynamic-config registry** (wave 2): 130 zod-typed config keys recovered from client
  registries (14 grok-bot-product `sand_*`/`grok_*`, 116 shared-platform) + 3 hard-coded gates;
  presence proves bundling, not remote enablement.
- **Renderer topology** (wave 2): authored source-path → chunk map for 8 entrypoints and
  21 transcript cards, entrypoint framework contract (`eagerBoundaries`/`lazyViews`),
  canonical surface anchors (`overlay:settings`, `view:org-chart`, …), 303-edge chunk graph.
- **RPC contracts deepened** (wave 2): payload field types/nullability from handler bodies,
  return shapes, assertion constraint strings surfaced as `MAIN_RPC_CONSTRAINTS`.
- **Host/state contracts** (wave 2): local-tool permission precedence (never < ask < always,
  ceiling only restricts), skills roots registry (.cursor/.claude/.codex/.grok/.agents),
  Agent Store vs Sandbox Store separation, MCP lifecycle/OAuth knobs.
- **Version snapshots** (wave 2): `npm run snapshot` writes `versions/v<version>.json`;
  `--diff versions/v0.24.0.json` reports added/removed surfaces against any future artifact.

## Repo layout

- `scripts/` — reproducible ingest (`npm run ingest`), analyzers, generators, validators
- `src/wire/` — generated clean-room wire interfaces (desktop bridge, coordinator bridge)
- `evidence/curated/` — reviewed provenance docs · `evidence/generated/` — ignored outputs
- `claims/` — machine-readable claim ledger + per-subsystem triangulation
- `docs/subsystems/`, `docs/ui/` — architecture atlas
- `tests/` — `node --test` suites

## Usage

```sh
GROK_BOT_ZIP=/path/to/Grok_Bot_0.24.0_linux_x64.zip npm run ingest   # verify SHA + extract to gitignored cache
npm run validate        # deterministic validators (drift, sha gate, ledger)
npm test                # unit suites (no artifact needed)
npm run build:desktop && npm run test:dom      # DOM/text scenario tests (jsdom)
npm run snapshot        # versions/<v>.json surface inventory; --diff for drift
npm run gen:desktop-bridge && npm run gen:coordinator-bridge   # regenerate wire TS
```

## Rules

- No proprietary implementation bodies, minified source, asar contents, binaries,
  credentials, or prompt prose enter Git. Generated evidence is reproducible and ignored.
- Analogy (grok-build, OpenMausBot) never upgrades confidence; see `claims/triangulation.json`.
