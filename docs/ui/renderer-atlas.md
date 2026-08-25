# Renderer atlas (UI/UX reconstruction baseline)

**Evidence:** `dist/renderer` (171 JS chunks + index-yJda_gYk.css), scanned by
`scripts/analyze-renderer.mjs` → `evidence/generated/renderer-atlas.json`. Confidence:
A for string-level hits, B for structural inferences below.

## Architecture findings

- Single-entry Vite SPA: index.html loads one `index-Bbahbz13.js` + `index-yJda_gYk.css`;
  everything else is lazy chunks (`DefaultCode-*` 7.7 MB is the largest).
- **No URL router found** (no react-router/createBrowserRouter). Navigation is an in-app
  page stack (`history.pages`, View* view-model classes: ViewConfig/ViewChange/ViewCommitted,
  ScreenLoading/ScreenUnavailable). Deep links arrive as main-process `deep-link` events.
  Reconstruction implication: scenario routes for screenshots must be app-state fixtures, not URL paths.
- Design tokens are `--sand-*` (blur background, gradients, shadows: inline/modal/popover/window)
  plus `--cursor-radius-*`. Confirms the "sand" codename end-to-end.

## Recovered structure (atlas v2)

`scripts/analyze-renderer.mjs` recovers deterministically from the shipped bundles:

- **Module graph** — 217 static `from"./…"` edges + **142 lazy `import("./…")` boundaries**;
  the entry bundle lazily imports the `view-*` chunks (page surfaces).
- **Semantic clusters** — 67 stable chunk-name prefixes (chat, agents, core, settings,
  shared, view, general, updates, pane, messages, channel, surface, usage, map, graph,
  plus diagram/mermaid/cytoscape vendor families).
- **Stores** — the kv namespace allowlist recovered from `const T=[…],S=new Set(T)`:
  `client-meta.account-slot`, `composer-drafts`, `host-settings.onboarding`,
  `roster.agent-avatars`, `roster.last-roster`, `selection.last-agent`, `send-journal`,
  `sidebar.last-sections`, `transcript.replicas`, `ui-agent-refs`, `ui-layout`, `other`.
- **Transcript item registry** — text, attachment, widget, cursor-agent, secret-request,
  email-draft, slack-draft, permission-request, connector, connectors, listener-connect,
  bot-template-share, auto-review-approval, local-tool-permission (14 kinds).
- **Event-card registry** — pr-opened, pr-pushed, pr-merged, review-requested,
  review-approved, review-changes-requested, review-commented, pr-comment,
  inline-review-comment, review-thread-resolved/unresolved, issue-assigned,
  ci-passed, ci-failed (14 ids, main bundle).
- **Label catalog** — ~18.7k i18n message entries (`key":["text"]`), of which the
  curated surface labels are distilled into `evidence/generated/ui-evidence-matrix.json`
  and `apps/desktop/labels.ts` (see surface-atlas.md).

## Product vocabulary confirmed in shipped bundles

| String | Where |
| --- | --- |
| "Take over" | index-Bbahbz13.js |
| "Teach a task" | index-Bbahbz13.js |
| "What do you use every day?" | index-Bbahbz13.js |
| "Auto-review" | chat-*.js chunks |
| "Agent Computer" | core-*.js, index-Bbahbz13.js |

Unconfirmed so far (search continues): "hidden chats", "suggested teammate", "command palette".

## Notification/review card types

PR-review event card ids in main bundle: pr-opened, pr-pushed, pr-merged,
review-requested, review-approved, review-changes-requested, review-commented,
inline-review-comment, review-thread-resolved — these drive approvals/auto-review surfaces.

## Chunk topology hints

Named lazy chunks include: chat-*, agents-*, core-*, cynefin-*, mermaid.core-*, cytoscape.esm-*,
xlsx-, pdf-, compact-, DefaultCode-. These map to product surfaces (chat, agents grid,
org-chart/graph views, document rendering) and give clean-room module boundaries.

## Reconstruction mapping (clean-room names)

Shipped chunk names are hashed/minified; component file names are NOT preserved.
All reconstructed UI uses explicit clean-room names per the repo convention, anchored to
the sidebar-first layout and the vocabulary/table above.
