# Execution plane — ControlService, local-exec daemon, Box lifecycle, VNC

**Evidence:** shipped `host-main.cjs`, `electron-main.cjs` ConnectRPC service tables,
`local-exec-daemon/main.cjs`, coordinator strings — confidence A for method/enum names,
B for behavioural readings.

Generated surface: [`evidence/generated/services-atlas.json`](../../evidence/generated/services-atlas.json)
→ committed contract `src/wire/subsystems.generated.ts` (17 services, 2244 methods).

## agent.v1.ControlService (box-side execution contract)

26 methods served inside the box (host plane). Grouped by capability — all names artifact-proven:

| Group | Methods |
| --- | --- |
| process exec | `exec` (ServerStreaming), `ping`, `getCapabilities` |
| filesystem | `listDirectory`, `readTextFile`, `writeTextFile`, `readBinaryFile`, `writeBinaryFile`, `exportFile` (ServerStreaming) |
| workspace diffing | `getDiff`, `batchGetDiff`, `getWorkspaceChangesHash` |
| artifacts / store handoff | `listArtifacts`, `uploadArtifacts`, `persistArtifactsToAgentStore`, `persistArtifactsToParentStore`, `restoreArtifacts` |
| MCP | `loadMcpServers`, `getMcpRefreshTokens` |
| skills / plugins | `reloadAgentSkills`, `reloadPlugins`, `installPluginArtifact` |
| environment | `updateEnvironmentVariables` (env map + replace flag observed at call site) |
| identity / remote access | `refreshGithubAccessToken`, `warmRemoteAccessServer`, `downloadCursorServer` |

The `persistArtifactsToAgentStore` vs `persistArtifactsToParentStore` pair is direct evidence
of the **nested-store boundary**: a box (child agent) can commit durable artifacts either to its
own agent store or up to the parent's store; `restoreArtifacts` closes the loop.

## Local-exec path (outside the box)

A separate ~4 MB `dist/local-exec-daemon/main.cjs` bundle runs commands on the host itself,
parallel to the box path (`LocalExecBridge`, `LocalExecProvider`, `LocalExecAllowlistEnforcement`,
`LocalExecRefused/Failed/SpawnFailed` error vocabulary in host-main).

State files (paths joined in coordinator-main):

```
local-exec-daemon-connection.json   local-exec-daemon.json (discovery)
local-exec-daemon-credential.json   local-exec-supervisor.json
local-exec-update-lease.json        local-exec-account-retire.json
local-exec-account-generation.json  local-exec-daemon.log
```

`SAND_LOCAL_EXEC_GENERATION` + the retire/generation files imply generation-counter-based
ownership: a stale daemon from a previous account/session can be detected and replaced.
Channel strings `exec-daemon-shutdown/-ownership/-file-key-handoff/-credential/-connection/-refresh`
prove an explicit lifecycle protocol between coordinator/electron-main and the daemon.
Credential material arrives via `/sand-box/local-exec-daemon-credential`.

## Box lifecycle & snapshots (cloud-mediated)

GrokBotService (47 methods) + SandBoxService (36 methods) are the cloud control surfaces:

- ensure/recreate/forceRecreate (+ admin variants), `watchSandBoxMigration` ServerStreaming.
- Run state getter + upgrade schedule get/schedule/cancel/reschedule (states in
  [host-and-box.md](./host-and-box.md)).
- Store pipeline: presign writes/reads, multipart complete/abort, stat/list objects,
  admin snapshot → manifest versions → restore snapshot, admin hibernate.
- Team scope: listTeamMemberSandBoxes, killTeamMemberSandBox, team setup manifests CRUD.
- Transcript/agent CRUD: createGrokBotAgent/Templates, Commit/ListGrokBotTranscriptEntries.

Snapshot semantics reading (B): snapshots are store-level manifests (`AdminSnapshotSandBoxStore`
→ `adminListSandBoxStoreManifestVersions` → `adminRestoreSandBoxStoreSnapshot`), i.e. image
versioning of the box state, distinct from per-run migration phases.

## Forced egress & VNC/computer-use

Egress modes ALLOW_ALL / DEFAULT_WITH_NETWORK_SETTINGS / NETWORK_SETTINGS_ONLY (+UNSPECIFIED)
with desktop tunnel toggle envs `SAND_EGRESS_TUNNEL_URL/_BEARER/_NETWORK_TOKEN/_ALLOW_PRIVATE`.
See [security-model.md](./security-model.md) for precedence reading.

VNC contract (preload-vnc.cjs + host-main): websockify URLs built with `port_token` (direct)
or `network_token` (routed), `vnc_port_token_min_version` negotiation; preload exposes a
session viewer with liveness sampler, clipboard mirror, and host-key handling; presence flows
back as `vnc-user-presence` desktop events.
