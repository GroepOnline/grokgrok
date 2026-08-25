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

## Topology deep-scan (wave 2)

Full machine-readable topology: `evidence/generated/renderer-topology.json`
(`scripts/analyze-renderer-topology.mjs`; validated by `scripts/validate-renderer-topology.mjs`).
Confidence: A — extracted from Vite glob module maps embedded in the entry chunk.

| Surface | Count | Notes |
| --- | --- | --- |
| Entrypoint dirs (authored `./features/.../entrypoint.ts`) | 8 | chat/workspace, computer/overlay, hidden-chats/overlay, org-chart/workspace, plugins/overlay, settings/overlay{,/beta,/usage} |
| Lazy view chunks wired to entrypoints | per-dir | via `import("./view-<hash>.js")` boundaries |
| Transcript cards (`.../cards/**`) | 21 | agents/events, channels/events, chat/messages + notices; each has an eager definition module and a lazy view chunk |
| JS chunks in artifact | 171 | hashes are build-specific |
| Import graph edges | 303 | 141 dynamic (lazy) boundaries |

Authored framework contract (embedded verbatim in the bundle):
`{declaration:"entrypoint.ts", eagerBoundaries:["loading.tsx","error.tsx"], lazyViews:["view.tsx","layout.tsx"]}`
— each feature dir declares an eager `entrypoint.ts`, with `view.tsx`/`layout.tsx` as lazy siblings.

Semantic surface anchors (`aa` registry): `view:org-chart`,
`overlay:settings(/usage|/beta)`, `overlay:plugins`, `overlay:computer`,
`overlay:hidden-chats`, `overlay:galleries`, `overlay:widget-gallery`,
`overlay:network`, `overlay:broadcast`. These are the canonical screen ids the
desktop shell navigates by — reconstruction uses them as scenario keys.
