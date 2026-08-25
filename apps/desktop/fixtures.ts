// Deterministic scenario fixtures for the reconstruction shell.
// Each scenario boots the app into a fixed state so every major surface can be
// launched deterministically (see apps/desktop/scenarios in tests).
// All bot/room names are clean-room inventions; UI strings come from labels.ts.
import { resetPages, requestRender, type AppState, type Bot, type TranscriptItem } from "./state.js";
import { setCreateStep } from "./views-surfaces.js";

const AVATAR_COLORS = ["#c8d8c0", "#c9d3e2", "#e2d3c9", "#d5d5cf", "#d9e2d3", "#e2dcc9"];

function bot(id: string, name: string, i: number, extra: Partial<Bot> = {}): Bot {
  return {
    id,
    name,
    description: "",
    instructions: "",
    model: "grok-4",
    plugins: [],
    skills: [],
    avatar: { shape: "blob", color: AVATAR_COLORS[i % AVATAR_COLORS.length]! },
    hidden: false,
    sectionId: null,
    state: "idle",
    ...extra,
  };
}

function baseState(): AppState {
  return {
    bots: [
      bot("b1", "Daily driver", 0, { state: "attention" }),
      bot("b2", "Inbox triage", 1, { state: "working" }),
      bot("b3", "Release notes", 2),
      bot("b4", "Old research", 3, { hidden: true }),
    ],
    rooms: [
      { id: "r1", kind: "channel", name: "launch-war-room", members: ["b1", "b2"] },
      { id: "r2", kind: "group", name: "Weekday standup", members: ["b2", "b3"] },
      { id: "r3", kind: "channel", name: "deploys", members: ["b3"] },
    ],
    routines: [
      {
        id: "rt1", botId: "b1", name: "Morning inbox sweep",
        prompt: "Triage unread mail and draft replies for review.",
        trigger: { source: "schedule", spec: "Every day · 08:00", fields: { time: "08:00" } },
        enabled: true, lastRun: "today 08:00",
      },
      {
        id: "rt2", botId: "b1", name: "CI watch",
        prompt: "Check CI on my repo; if red, propose a fix.",
        trigger: { source: "event", spec: "ci-failed", fields: { platform: "github", repo: "acme/api" } },
        enabled: false,
      },
    ],
    plugins: [
      { id: "gmail", name: "@gmail", installed: true, scopes: ["read", "draft"] },
      { id: "calendar", name: "@calendar", installed: true, scopes: ["read"] },
      { id: "drive", name: "@drive", installed: false, scopes: [] },
      { id: "linear", name: "@linear", installed: true, scopes: ["issues"] },
    ],
    transcripts: new Map(),
    pageStack: [{ name: "chat", botId: "b1" }],
    sidebarCollapsed: false,
    showHiddenInSidebar: false,
    searchQuery: "",
    paletteOpen: false,
    theme: "system",
    updateState: "up-to-date",
    updateTrack: "stable",
    autoReviewInstructions: "Require Approval for pushes to main.",
    localToolPermission: "ask",
    scenario: "default",
  };
}

function transcriptB1(): TranscriptItem[] {
  return [
    { kind: "text", role: "user", text: "Check CI on my repo and fix any red workflow." },
    { kind: "text", role: "bot", text: "Looking at the failing workflow now." },
    { kind: "widget", tool: "github", detail: "ci-failed on main · typecheck (1 error)" },
    { kind: "cursor-agent", detail: "Agent Computer — browser opened to the Actions tab" },
    { kind: "text", role: "bot", text: "I have a one-line fix ready to push to main." },
    { kind: "auto-review-approval", text: "push fix commit to main?", detail: "Auto-review: Require Approval", pending: true },
    { kind: "secret-request", detail: "NPM_TOKEN needed to publish", pending: true },
    { kind: "text", role: "bot", text: "Waiting on your approval to continue." },
  ];
}

export const SCENARIOS = [
  "default", "onboarding", "create-bot", "approvals", "computer", "teach",
  "bot-details", "routines", "plugins", "settings-general", "settings-appearance",
  "settings-updates", "hidden-chats", "org-chart", "palette", "empty-sidebar",
] as const;
export type ScenarioId = (typeof SCENARIOS)[number];

export function loadScenario(id: string): AppState {
  const s = baseState();
  s.scenario = id;
  s.transcripts.set("b1", transcriptB1());

  switch (id as ScenarioId) {
    case "default":
      break;
    case "empty-sidebar":
      s.bots = [];
      s.rooms = [];
      s.routines = [];
      break;
    case "onboarding":
      setCreateStep("roles");
      resetTo(s, { name: "create-bot" });
      break;
    case "create-bot":
      setCreateStep("details");
      resetTo(s, { name: "create-bot" });
      break;
    case "approvals":
      // transcript b1 already carries pending approval + secret cards
      break;
    case "computer":
      resetTo(s, { name: "computer", botId: "b2" });
      break;
    case "teach":
      resetTo(s, { name: "chat", botId: "b1" });
      s.transcripts.set("b1", [
        { kind: "cursor-agent", detail: "Teach a task — recording steps", pending: true },
        { kind: "text", role: "bot", text: "Recording. Show me what to do, then stop when done." },
      ]);
      break;
    case "bot-details":
      resetTo(s, { name: "bot-details", botId: "b1" });
      break;
    case "routines":
      resetTo(s, { name: "routines", botId: "b1" });
      break;
    case "plugins":
      resetTo(s, { name: "plugins" });
      break;
    case "settings-general":
      resetTo(s, { name: "settings", tab: "general" });
      break;
    case "settings-appearance":
      resetTo(s, { name: "settings", tab: "appearance" });
      break;
    case "settings-updates":
      resetTo(s, { name: "settings", tab: "updates" });
      s.updateState = "ready";
      break;
    case "hidden-chats":
      resetTo(s, { name: "hidden-chats" });
      break;
    case "org-chart":
      resetTo(s, { name: "org-chart" });
      break;
    case "palette":
      resetTo(s, { name: "chat", botId: "b1" });
      s.paletteOpen = true;
      break;
  }
  return s;
}

function resetTo(s: AppState, p: AppState["pageStack"][number]): void {
  s.pageStack = [p];
}

/** Install a scenario into the live store (mutating in place). */
export function bootScenario(store: AppState, id: string): void {
  const fresh = loadScenario(id);
  store.bots = fresh.bots;
  store.rooms = fresh.rooms;
  store.routines = fresh.routines;
  store.plugins = fresh.plugins;
  store.transcripts = fresh.transcripts;
  store.pageStack = fresh.pageStack;
  store.paletteOpen = fresh.paletteOpen;
  store.scenario = id;
  requestRender();
}
