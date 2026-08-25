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
- Execution plane: `agent.v1.ControlService` (26 box-side methods), separate local-exec
  daemon with generation-based ownership, GrokBot/SandBox cloud services (83 methods).
- Automations: 42-method AutomationsService incl. automation-memory CRUD (distinct plane).
- MCP/skills/plugins: lease-synced to box filesystem, per-tool failure telemetry,
  OAuth discovery auth, per-server tool-disable.
- Feature gates: 212 `SAND_*` names, Statsig-backed, grouped atlas + version-diff hook.
- Native ABI: 9 N-API modules (linux-active) vs quarantined win32-only payloads.
- Renderer: page-stack navigation (no URL router), `--sand-*` design tokens.

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
npm run analyze:all     # deterministic atlases -> evidence/generated/*.json (needs cache)
npm run gen:contracts   # regenerate src/wire/subsystems.generated.ts from atlases
npm run validate        # deterministic validators (drift, sha gate, ledger, atlas invariants)
npm test                # spot-check suites
npm run gen:desktop-bridge && npm run gen:coordinator-bridge   # regenerate wire TS
node scripts/diff-version.mjs <old-generated-dir>             # version-diff hook for future releases
```

## Rules

- No proprietary implementation bodies, minified source, asar contents, binaries,
  credentials, or prompt prose enter Git. Generated evidence is reproducible and ignored.
- Analogy (grok-build, OpenMausBot) never upgrades confidence; see `claims/triangulation.json`.
