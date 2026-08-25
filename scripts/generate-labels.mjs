// One-off generator for apps/desktop/labels.ts from ui-evidence-matrix.json.
// The emitted file IS committed (repo convention: reproducible generated files
// like src/wire/*.generated.ts). Re-run after changing the curated surfaces in
// scripts/analyze-renderer.mjs: node scripts/generate-labels.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const matrix = JSON.parse(fs.readFileSync(path.join(REPO, "evidence/generated/ui-evidence-matrix.json"), "utf8"));

// curated label ids in emission order: surface -> [ [id, exact label text] ]
const IDS = {
  "sidebar": [
    ["sidebar", "Sidebar"], ["collapseSidebar", "Collapse sidebar"], ["expandSidebar", "Expand sidebar"],
    ["resizeSidebar", "Resize sidebar"], ["searchBots", "Search Bots"], ["newSection", "New section"],
    ["renameSection", "Rename section"], ["moveToSection", "Move to section"], ["sectionActions", "Section actions"],
    ["hideFromSidebar", "Hide from sidebar"], ["showHiddenBots", "Show Hidden Bots"], ["hiddenBots", "Hidden Bots"],
    ["newBotOrChannel", "New Bot or Channel"], ["channels", "Channels"], ["groups", "Groups"],
  ],
  "onboarding.tool-selector": [
    ["whatDaily", "What do you use every day?"], ["roleMarketingAnalyst", "Marketing Analyst"],
    ["roleOutreach", "Outreach"], ["roleQaEngineer", "QA Engineer"], ["roleResearcher", "Researcher"],
    ["roleExpenseAuditor", "Expense Auditor"], ["roleWinLossAnalyst", "Win-Loss Analyst"],
    ["create", "Create"], ["meetTeammate", "Meet a future teammate"], ["createFirstBot", "Create your first Bot"],
    ["nameYourBot", "Name your Bot"], ["nameTeammate", "Name a teammate and describe what they should do"],
    ["whatHelpWith", "What should this Bot help with?"], ["describeBot", "Describe what your Bot does"],
  ],
  "create-bot.avatar": [
    ["editAvatar", "Edit Avatar"], ["avatarEditor", "Avatar editor"], ["avatarSource", "Avatar source"],
    ["characterShape", "Character shape"], ["shuffle", "Shuffle"], ["describeAvatar", "Describe your avatar"],
    ["describeAvatarPh", "Describe your avatar…"], ["generatingAvatar", "Generating avatar"],
    ["setAvatar", "Set avatar"], ["editBotAvatar", "Edit Bot avatar"],
  ],
  "chat.composer": [["search", "Search"], ["noToolsMatch", "No tools match “"], ["send", "Send"]],
  "bot-details": [
    ["botSettings", "Bot settings"], ["instructions", "Instructions"], ["model", "Model"],
    ["name", "Name"], ["routinesBlurb", "Routines are recurring tasks this Bot runs on a schedule."],
  ],
  "agent-computer": [
    ["agentComputer", "Agent Computer"], ["grokComputer", "Grok Bot's Computer"], ["takeOver", "Take over"],
    ["openComputer", "Open computer"], ["computerPreview", "Computer preview"],
    ["runsLocal", "Runs on your local computer"], ["runsCloud", "Runs on Grok Bot's computer"],
  ],
  "teach-a-task": [["teachTask", "Teach a task"]],
  "routines.editor": [
    ["routines", "Routines"], ["createRoutine", "Create Routine"], ["routine", "Routine"],
    ["nameThisRoutine", "Name this routine"], ["triggers", "Triggers"], ["addTrigger", "Add trigger"],
    ["triggerFields", "Trigger fields"], ["triggerSource", "Trigger source"], ["backToRoutines", "Back to Routines"],
    ["afterSave", "Available after the routine is saved"],
    ["routineRunsPrompt", "What should this routine do each time it runs?"],
  ],
  "plugins": [["plugins", "Plugins"], ["plugin", "Plugin"], ["uninstall", "Uninstall"], ["install", "Install"]],
  "settings.general": [
    ["settings", "Settings"], ["general", "General"],
    ["localToolPermissions", "Local tool permissions"], ["localToolPermission", "Local tool permission"],
  ],
  "settings.appearance": [
    ["appearance", "Appearance"], ["theme", "Theme"], ["themeDark", "Theme: Dark"],
    ["themeLight", "Theme: Light"], ["themeSystem", "Theme: System"], ["systemDefault", "System Default"],
    ["light", "Light"], ["dark", "Dark"], ["system", "System"],
  ],
  "settings.updates": [
    ["updates", "Updates"], ["checkForUpdates", "Check for Updates"], ["restartToUpdate", "Restart to update"],
    ["updateReady", "Update ready"], ["newUpdateAvailable", "New update available"],
    ["updatesFollowTrack", "Updates follow the "], ["version", "Version "],
  ],
  "hidden-chats": [
    ["hcShowHiddenBots", "Show Hidden Bots"], ["hcHiddenBots", "Hidden Bots"], ["hcAllBotsCount", "All Bots ("],
    ["hcHiddenBlurb", "Hidden Bots stay active and keep their history, they just don't show in the sidebar."],
    ["hcAllBotsHidden", "All bots are hidden"],
  ],
  "org-chart": [
    ["orgChart", "Org chart"], ["closeOrgChart", "Close org chart"], ["orgChartDetails", "Org chart details"],
    ["botNetwork", "Bot network"], ["noBotsYetNetwork", "No Bots yet. Create a few teammates and the network draws itself."],
    ["networkLegend", "Bots and groups, linked by who has messaged whom (solid) and group membership (dashed). Click a node to open it."],
  ],
  "command-palette": [["paletteSearch", "Search"], ["suggestions", "Suggestions"]],
  "approvals": [
    ["approvalNeeded", "Approval needed"], ["approve", "Approve"], ["deny", "Deny"], ["denyOnce", "Deny once"],
    ["alwaysAllow", "Always allow"], ["alwaysAllowed", "Always allowed"], ["autoReviewApproval", "Auto-review approval"],
  ],
  "secret-requests": [
    ["requestSent", "Request sent. Once the host approves, "], ["couldNotStoreSecret", "Could not store the secret"], ["shareSecretPrefix", "Share "],
  ],
};

// index matrix labels by surface+text
const lookup = new Map();
for (const sf of matrix.surfaces) {
  for (const l of sf.labels) lookup.set(`${sf.surface}\u0000${l.text}`, l);
}

const tsEsc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
let body = "";
const missing = [];
for (const [surface, entries] of Object.entries(IDS)) {
  body += `  // ${surface}\n`;
  for (const [id, text] of entries) {
    const hit = lookup.get(`${surface}\u0000${text}`);
    if (!hit) { missing.push(`${surface}: ${text}`); continue; }
    const chunks = hit.chunks.slice(0, 3); // provenance sample (full set in matrix)
    body += `  ${id}: { surface: "${surface}", text: "${tsEsc(text)}", key: "${tsEsc(hit.catalogKey)}", chunks: [${chunks.map((c) => `"${c}"`).join(", ")}] },\n`;
  }
}
if (missing.length) {
  console.error("MISSING (not confirmed in matrix):");
  for (const m of missing) console.error("  " + m);
  process.exit(1);
}

const out = `// GENERATED by scripts/generate-labels.mjs from evidence/generated/ui-evidence-matrix.json
// (itself produced deterministically from the shipped Grok Bot 0.24 renderer
// bundles by scripts/analyze-renderer.mjs). Do not hand-edit strings or
// provenance; regenerate instead. Clean-room ids are ours; text/key/chunks are
// artifact-recovered (confidence A). Geometry/layout is NOT claimed here.
// Trailing-space labels ("Updates follow the ") are interpolation prefixes in
// the shipped message catalog.

export interface Label {
  readonly surface: string;
  /** Exact shipped string (confidence A). */
  readonly text: string;
  /** i18n message id in the shipped bundle, or "(string-literal)". */
  readonly key: string;
  /** Provenance chunk sample(s) in dist/renderer/assets. */
  readonly chunks: readonly string[];
}

export const LABELS = {
${body}} as const satisfies Record<string, Label>;

export type LabelId = keyof typeof LABELS;

/** Look up an artifact-backed label by id. */
export function t(id: LabelId): string {
  return LABELS[id].text;
}

/** All labels grouped by surface (validator/test convenience). */
export function labelsBySurface(): Map<string, Label[]> {
  const m = new Map<string, Label[]>();
  for (const l of Object.values(LABELS)) {
    if (!m.has(l.surface)) m.set(l.surface, []);
    m.get(l.surface)!.push(l);
  }
  return m;
}
`;
fs.writeFileSync(path.join(REPO, "apps/desktop/labels.ts"), out);
console.error(`labels.ts: ${Object.values(IDS).flat().length} labels written`);
