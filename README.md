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

## Repo layout

- `apps/desktop/` — runnable clean-room reconstruction shell (vanilla TS, zero runtime deps)
- `scripts/` — reproducible ingest (`npm run ingest`), analyzers, generators, validators
- `src/wire/` — generated clean-room wire interfaces (desktop bridge, coordinator bridge)
- `evidence/curated/` — reviewed provenance docs · `evidence/generated/` — ignored outputs
- `claims/` — machine-readable claim ledger + per-subsystem triangulation
- `docs/subsystems/`, `docs/ui/` — architecture atlas
- `tests/` — `node --test` suites

## Usage

```sh
GROK_BOT_ZIP=/path/to/Grok_Bot_0.24.0_linux_x64.zip npm run ingest   # verify SHA + extract to gitignored cache
npm run validate        # deterministic validators (drift, sha gate, ledger, ui evidence)
npm test                # spot-check suites
npm run gen:desktop-bridge && npm run gen:coordinator-bridge   # regenerate wire TS
npm run gen:labels      # regenerate apps/desktop/labels.ts from the ui evidence matrix
```

## Desktop reconstruction shell

`apps/desktop` is a runnable clean-room shell of the Grok Bot 0.24 renderer:
sidebar (design anchor), chat/composer with transcript cards (approvals, secret
requests, Agent Computer activity), onboarding/tool selector, create-bot avatar
picker, bot details, routines editor, plugins, settings (General / Plugins /
Appearance / Updates), hidden chats, org chart / bot network, and a command
palette. All product copy comes from `apps/desktop/labels.ts` (artifact-backed;
see `docs/ui/surface-atlas.md`); geometry is marked visual-inference there.

```sh
npm run build:desktop          # compile to apps/desktop/dist
# serve apps/desktop/dist and open /?scenario=<id> for a deterministic surface:
# onboarding | create-bot | approvals | computer | teach | bot-details | routines |
# plugins | settings-general | settings-appearance | settings-updates |
# hidden-chats | org-chart | palette | empty-sidebar
```

## Rules

- No proprietary implementation bodies, minified source, asar contents, binaries,
  credentials, or prompt prose enter Git. Generated evidence is reproducible and ignored.
- Analogy (grok-build, OpenMausBot) never upgrades confidence; see `claims/triangulation.json`.
