# Surface atlas (UI/UX reconstruction baseline)

**Evidence tier:** every "artifact truth" string below is confidence A — recovered
verbatim from the shipped Grok Bot 0.24 renderer bundles by
`scripts/analyze-renderer.mjs` → `evidence/generated/ui-evidence-matrix.json`
(catalog key + chunk provenance per label; 17 surfaces, 100+ labels).
Everything marked **visual-inference** is our clean-room interpretation: no
screenshot or geometry truth exists in the artifact evidence we mine.

## Navigation model

Artifact truth: the shipped renderer has **no URL router** — navigation is an
in-app page stack (`history.pages`, View* view-models; see renderer-atlas.md).
Deep links arrive as main-process `deep-link` events.

Reconstruction: the shell mirrors the page stack (`state.pageStack`). The
`?scenario=<id>` boot parameter is a **reconstruction-harness affordance** for
deterministic launches — it is not artifact truth.

## Surfaces

| Surface | Scenario | Artifact-backed copy (samples) | Visual-inference |
| --- | --- | --- | --- |
| Sidebar (design anchor) | `default` | "Sidebar", "Collapse/Expand/Resize sidebar", "Search Bots", "New section", "Rename section", "Move to section", "Section actions", "Hide from sidebar", "Show Hidden Bots", "Hidden Bots", "New Bot or Channel", "Channels", "Groups" | item spacing, section grouping, badge styling |
| Onboarding / tool selector | `onboarding` | "What do you use every day?", "Meet a future teammate", role cards: Marketing Analyst, Outreach, QA Engineer, Researcher, Expense Auditor, Win-Loss Analyst, "Create your first Bot" | card grid geometry, step order roles→details |
| Create bot + avatar picker | `create-bot` | "Name your Bot", "Name a teammate and describe what they should do", "What should this Bot help with?", "Describe what your Bot does", "Edit Avatar", "Avatar editor", "Avatar source", "Character shape", "Shuffle", "Describe your avatar…", "Generating avatar", "Set avatar", "Edit Bot avatar" | shape set (circle/square/blob), color swatches, editor layout |
| Chat + composer | `default` | "Send", "Search", "No tools match “" | composer layout, chip row, message bubbles |
| Transcript cards | `approvals` | kinds registry: text, attachment, widget, cursor-agent, secret-request, email-draft, slack-draft, permission-request, connector(s), listener-connect, bot-template-share, auto-review-approval, local-tool-permission; event cards: pr-opened … ci-failed (14 ids); "Approval needed", "Approve", "Deny", "Deny once", "Always allow", "Auto-review approval", "Share " | card chrome, resolved states, button order |
| Bot details | `bot-details` | "Bot settings", "Name", "Model", "Instructions", "Routines are recurring tasks this Bot runs on a schedule." | form layout, model option list |
| Routines editor | `routines` | "Routines", "Create Routine", "Routine", "Name this routine", "Triggers", "Add trigger", "Trigger fields", "Trigger source", "Back to Routines", "Available after the routine is saved", "What should this routine do each time it runs?" | field grouping, schedule/event split |
| Agent Computer | `computer` | "Agent Computer", "Grok Bot's Computer", "Take over", "Open computer", "Computer preview", "Runs on your local computer", "Runs on Grok Bot's computer" | preview pane, in-use strip |
| Teach a task | `teach` | "Teach a task" | recording UX |
| Plugins | `plugins` | "Plugins", "Plugin", "Uninstall", "Install" | card grid, scope list |
| Settings · General | `settings-general` | "Settings", "General", "Local tool permissions", "Local tool permission", "Auto-review approval" | tab bar, permission options |
| Settings · Appearance | `settings-appearance` | "Appearance", "Theme", "Theme: Dark/Light/System", "System Default", "Light", "Dark", "System" | segmented control |
| Settings · Updates | `settings-updates` | "Updates", "Check for Updates", "Restart to update", "Update ready", "New update available", "Updates follow the ", "Version " | status line, track display |
| Hidden chats | `hidden-chats` | "Hidden Bots", "Show Hidden Bots", "All Bots (", "Hidden Bots stay active and keep their history, they just don't show in the sidebar.", "All bots are hidden" | list layout |
| Org chart / agent network | `org-chart` | "Org chart", "Close org chart", "Org chart details", "Bot network", "No Bots yet. Create a few teammates and the network draws itself.", "Bots and groups, linked by who has messaged whom (solid) and group membership (dashed). Click a node to open it." | ring layout, edge styling (solid/dashed is artifact-copy-derived) |
| Command palette | `palette` | "Search", "Suggestions" | overlay geometry, command list (our commands are clean-room) |
| Secret requests | in `approvals` transcript | "Request sent. Once the host approves, ", "Could not store the secret", "Share " | card heading, deny flow copy |

## Design tokens

Artifact truth: token **names** `--sand-*` (shadows: inline/modal/popover/window;
blur, gradients, radii — 700+ distinct names in `index-yJda_gYk.css`, see
`designTokens.sand` in the generated atlas) and `--cursor-radius-*`.
Visual-inference: all **values** in `apps/desktop/styles.css` are our neutral
interpretation; dark theme values likewise.

## Deterministic launches

```sh
npm run build:desktop
# serve apps/desktop/dist, then:
#   /?scenario=onboarding | create-bot | approvals | computer | teach |
#   bot-details | routines | plugins | settings-general | settings-appearance |
#   settings-updates | hidden-chats | org-chart | palette | empty-sidebar
```

Scenario fixtures live in `apps/desktop/fixtures.ts`; the registry is enforced
by `scripts/validate-ui.mjs` and `tests/ui-shell.test.mjs`.
