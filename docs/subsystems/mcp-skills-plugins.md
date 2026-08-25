# MCP, skills, plugins — roots, auth, tool-disable, failure isolation

**Evidence:** shipped `host-main.cjs` / `electron-main.cjs` / `local-exec-daemon.cjs` /
`coordinator-main.cjs` strings + telemetry label tables. Confidence A for names,
B for readings. Generated atlas: `evidence/generated/mcp-skills-atlas.json`.

## Roots: where servers/skills/plugins live

- **Config state keys** (desktop main): `mcpServers`, `mcpDescriptors`, `mcpTools`,
  `mcpMetaToolOptions`, `mcpFileSystemOptions`, `mcpCustomInstructions{,ByServerId,AccountScope}`,
  `mcpDisabledToolsByServerId`, `mcpBoxServers`.
- **Filesystem roots**: `.cursor/skills`, `.cursor/plugins`, `.cursor/agents`,
  `.cursor/commands`, `.cursor/rules`, `.cursor/worktrees`, `.cursor/skills-cursor`,
  plus `/mcps` paths in the box; `mcp.json` / `.mcp.json` config files.
- **Sync model**: lease-based single-writer sync from app state onto the target filesystem
  (`mcpLease.onDidChange`, `pendingLeaseChangeEvent`) with divergence telemetry comparing
  expected vs actual servers on disk (`mcp.filesystem.sync_check.{expected,actual}_servers`,
  `divergence_type` label). A `plugin_snapshot_token` exists for plugin-state snapshots.

## ControlService methods (box side)

`LoadMcpServers`, `GetMcpRefreshTokens`, `ReloadAgentSkills`, `ReloadPlugins`,
`InstallPluginArtifact` — the box pulls server definitions and refresh tokens at run time.

## Coordinator commands (user-facing surface)

`skillsCatalog`, `syncPluginSkills`, `getPluginSyncStatus`, `getSkillPublishTargets`,
`publishSkill`, `resyncPublishedSkill`, `unpublishSkill`, `portAgentLocalSkills`,
`refreshMcp`, `listBoxMcpServers`.

## Auth contracts

- OAuth-style authorization code with discovery: `token_endpoint`,
  `token_endpoint_auth_methods_supported`, `token_endpoint_auth_signing_alg_values_supported`
  (PKCE negotiation), `/oauth-authz-req` route, `oauthRedirectUri`.
- State machine vocabulary: `OAuthAccount`, `OAuthTokens(Response)`, `OAuthPendingState`,
  `mcpAuthPromise(s)`, `mcpAuthCompletion`, `mcpAuthRequestQuery/Response`, `mcpAuthCopyOverrides`.
- Refresh-token handoff is three-plane: user secret store (desktop listSecrets/revealSecret),
  box secrets (`setBoxSecrets`/`getBoxSecretsStatus`), coordinator `submitSecret`; the box
  fetches via ControlService `getMcpRefreshTokens`. Reading (B): reveal to a server is an
  explicit step, not ambient.

## Tool-disable contract

`mcpDisabledToolsByServerId` — disable lists are **per-server**, keyed by server id.
There is no global tool-disable key observed. Combined with `mcpMetaToolOptions`
(meta-tool options), reading (B): disabling hides a tool from the model's callable set
while keeping the server connected.

## Failure isolation

Telemetry proves per-tool-call isolation at the boundary:

- Separate series per operation: `mcp.meta.get_tools_{success,error,duration_ms,...}`,
  `mcp.meta.call_tool_*`, `mcp.meta.fetch_resource_*`.
- `call_tool_error` carries `failure_reason` and `retryable` labels → failures are
  classified per call, per mode (`mcp_mode` label).
- No cross-server crash propagation is visible at this boundary (B); the lease/divergence
  machinery implies a wedged sync cannot silently corrupt on-disk state.

## Unknown

- The value vocabulary of the `mcp_source` telemetry label (candidates user/team/account/
  box/local exist as scope words elsewhere — hypothesis C only).
- Whether custom instructions merge order is defined anywhere observable in the client.
