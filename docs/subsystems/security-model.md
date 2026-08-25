# Security model

**Evidence:** shipped bundles (electron-main, host-main, node-agent-coordinator) —
confidence A for mechanism names, B for precedence semantics.

## Approval model (auto-review)

- Commands: `resolveAutoReviewApproval`, `resolveLocalToolPermission` (coordinator edge),
  `recordLocalToolApproval(approvalId, action, target)` and `get/setLocalToolPermission`
  + `getLocalToolPermissionCeiling` (desktop main edge), `clearLocalToolApprovals`.
- Settings vocabulary "Auto-review" appears in renderer chat chunks; host env
  `SAND_AUTO_REVIEW_MODE` proves the mode is carried into the host plane.
- Precedence reading (B): per-action approval records exist independently of the global
  mode; `Always Allow` corresponds to persisted permission grants bounded by a ceiling.
- Local-exec is separately gated: `LocalExecAllowlistEnforcement` + `LocalExecRefused`
  error names in host-main prove an allowlist check distinct from box exec permissions.

Unknown (not claimed): the exact evaluation order between auto-review mode, per-action
approvals, permission ceiling, and local-exec allowlist. The shipped client shows the
surfaces but not the comparator.

## Secrets

- Desktop: listSecrets/revealSecret/upsertSecrets/removeSecrets.
- Coordinator: submitSecret; host/box: setBoxSecrets/getBoxSecretsStatus.
- Reading (B): three planes — user secret store (main), agent-visible box secrets,
  coordinator-mediated handoff; reveal is an explicit user action.

## Egress

Modes ALLOW_ALL / DEFAULT_WITH_NETWORK_SETTINGS / NETWORK_SETTINGS_ONLY plus an
egress tunnel toggle with status events. Forced-egress default = network-settings-only
(HYPOTHESIS C on which mode ships default).

## Shared computers / team privacy

SAND_ACCESS_BLOCK_REASON_TEAM_PRIVACY_MODE / TEAM_ACCESS_REQUIRED / TEAM_SETUP_REQUIRED
prove team-scoped access gating; shared-container/shared-docker computer kinds carry
shared-computer semantics.

## WebAuthn proxy

get/setWebauthnProxyEnabled + changed events; unpacked native helper
`sand-webauthn-signer.exe`; `/webauthn/requests` + `/webauthn/responses` endpoints in host.
