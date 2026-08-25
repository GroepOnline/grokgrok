# Host plane, Box / SandBox, durable state

**Evidence:** shipped `dist/host/host-main.cjs` (~12 MB) — confidence A for names/enums,
B for behavioural semantics (states observed, not executed).

## Durable state (SQLite via better-sqlite3)

Tables recovered from CREATE TABLE strings in host-main.cjs:
`meta, files, pending_deletes, agents, messages, media, kv, blobs, transcript_entries`.

- `agents` / `messages` / `media` = agent store core; `transcript_entries` = transcript mirror;
  `blobs` + `files` + `pending_deletes` = content-addressed blob store with deferred GC;
  `kv` = generic key-value.
- Workers: `agent-isolation/agent-store-worker.cjs`, `agent-isolation/transcript-mirror-worker.cjs`
  (store access off the main thread), `extensions/box-store-sync/box-store-vacuum-worker.cjs`
  (GC), `extensions/content-search/search-index-worker.cjs`.

## Box / SandBox lifecycle

Enum-like env/state names prove a state machine (values are proto-style SCREAMING_SNAKE):

- **Run states:** ABSENT, HIBERNATED, RUNNING (+ UNSPECIFIED) → warm/cold box management.
- **Migration phases:** UNSPECIFIED, BACKING_UP, CLEANING_UP, CREATING, DONE, FAILED, MOVING, WIPING.
- **Upgrade schedule states:** WAITING_FOR_IMAGE, SCHEDULED, CLAIMED, RUNNING, COMPLETED,
  FAILED, MISSED, CANCELLED (+ UNSPECIFIED).
- **Store backend knobs:** SAND_BOX_STORE_BACKEND / _LOCAL_DIR / _COPY_IN(_CONCURRENCY) /
  _SYNC / _PACKS; multipart-upload failure codes (checksum-mismatch, precondition-failed,
  upload-not-found, restart-required, transient…) indicate an object-store-backed box image pipeline.
- **Computers:** SAND_BOX_COMPUTER, _DOCKER_HOST, _SHARED_DOCKER, _SHARED_CONTAINER,
  _CLUSTER — same-machine vs shared-container vs cluster targets.
- Watchdogs: SAND_RUN_WATCHDOG_MS/_GRACE_MS, stream retry/backoff knobs for headless and overload cases.

## Egress policy

Modes: ALLOW_ALL, DEFAULT_WITH_NETWORK_SETTINGS, NETWORK_SETTINGS_ONLY (+UNSPECIFIED);
tunnel toggle lives desktop-side (get/setEgressTunnelEnabled + changed events).

## Access / paywall model

SAND_ACCESS_STATE: GRANTED, PAYMENT_REQUIRED, UNAVAILABLE (+UNSPECIFIED).
Block reasons include FREE_TRIAL_AVAILABLE, PAYWALL_INDIVIDUAL, PAYWALL_TEAM_ADMIN/MEMBER,
TEAM_ACCESS_REQUIRED, TEAM_PRIVACY_MODE, TEAM_SETUP_REQUIRED — matching the Settings
"Team Setup" surface and trial claim states (PENDING_CARD, REJECTED_DUPLICATE_CARD, …).

## Memory persistence boundaries (four planes, all artifact-named)

| Plane | Storage | Evidence |
| --- | --- | --- |
| **Agent store** (conversation transcripts + media) | SQLite `agents`/`messages`/`media` tables via agent-store-worker | CLM-006; ControlService `persistArtifactsToAgentStore`/`ToParentStore` for cross-store handoff |
| **Automation memory** (durable per-automation notes) | cloud CRUD via AutomationsService: `listAutomationMemories`/`getAutomationMemory`/`updateAutomationMemory`/`deleteAutomationMemory` | distinct service surface — not a table in the local store |
| **User/project memory** (agent memory pipeline) | host-side memoryStore with user/project scoping (`userMemoryDir`, `projectMemory`, `addMemory`/`removeMemoryByContent`) + episode/extraction/synthesis knobs `SAND_MEMORY_*`, freeze kill-switch `SAND_DISABLE_MEMORY_FREEZE` | vocabulary in host-main; synthesis has its own verification knob |
| **SandBox filesystem** (ephemeral workspace state) | box image + store pipeline (presigned writes, multipart, snapshots) | GrokBotService/SandBoxService surfaces |

Conversation size is bounded by `SAND_CONVERSATION_SOFT/HARD_LIMIT_BYTES` + `SAND_CONVERSATION_GC`.

## Cloud API surface (`/sand/*`, backend from SAND_BACKEND_URL)

share-rooms CRUD/join/invite/picture, share-state, listener subscriptions/events,
automation events/runs, notify, feedback, xuser send/poll, teach-sessions under /workspace,
credentials via `/sand-box/inference-credential` and `/sand-box/local-exec-daemon-credential`.
Gateway: bind host/token/TLS knobs (SAND_GATEWAY_*), SSE streaming with gzip toggle.
