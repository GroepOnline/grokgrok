// Clean-room application state for the reconstruction shell.
// Navigation mirrors the shipped app's in-app page stack (no URL router;
// see docs/ui/renderer-atlas.md). Persistence namespaces below mirror the
// kv allowlist recovered by scripts/analyze-renderer.mjs (kvNamespaces);
// this shell keeps them in memory only.
import { t } from "./labels.js";

// ---------- entities ----------

export interface Avatar {
  /** visual-inference: blob/square/circle set seen as "Character shape"; exact shapes unknown */
  shape: "circle" | "square" | "blob";
  color: string;
}

export type BotState = "idle" | "working" | "attention";

export interface Bot {
  id: string;
  name: string;
  description: string;
  instructions: string;
  model: string;
  plugins: string[];
  skills: string[];
  avatar: Avatar;
  hidden: boolean;
  sectionId: string | null;
  state: BotState;
}

export interface Room {
  id: string;
  kind: "channel" | "group";
  name: string;
  members: string[];
  topic?: string;
}

export type TranscriptKind =
  | "text"
  | "widget"            // tool activity card
  | "cursor-agent"      // Agent Computer activity card
  | "permission-request" // approval card
  | "auto-review-approval"
  | "secret-request";

/** Transcript item kinds mirror the recovered transcript item registry. */
export interface TranscriptItem {
  kind: TranscriptKind;
  role?: "user" | "bot";
  text?: string;
  tool?: string;
  detail?: string;
  /** pending decision attached to the card */
  pending?: boolean;
}

export interface Trigger {
  source: "schedule" | "event";
  /** schedule: cron-ish local time; event: platform event id */
  spec: string;
  fields: Record<string, string>;
}

export interface Routine {
  id: string;
  botId: string;
  name: string;
  prompt: string;
  trigger: Trigger;
  enabled: boolean;
  lastRun?: string;
}

export interface PluginEntry {
  id: string;
  name: string;
  installed: boolean;
  scopes: string[];
}

export type ThemePref = "system" | "light" | "dark";
export type UpdateState = "up-to-date" | "checking" | "ready" | "disabled";

// ---------- navigation ----------

export type Page =
  | { name: "chat"; botId: string }
  | { name: "create-bot" }
  | { name: "bot-details"; botId: string }
  | { name: "routines"; botId: string; routineId?: string }
  | { name: "computer"; botId: string }
  | { name: "plugins" }
  | { name: "settings"; tab: "general" | "plugins" | "appearance" | "updates" }
  | { name: "hidden-chats" }
  | { name: "org-chart" };

export interface AppState {
  bots: Bot[];
  rooms: Room[];
  routines: Routine[];
  plugins: PluginEntry[];
  transcripts: Map<string, TranscriptItem[]>;
  pageStack: Page[]; // last = visible page
  sidebarCollapsed: boolean;
  showHiddenInSidebar: boolean;
  searchQuery: string;
  paletteOpen: boolean;
  theme: ThemePref;
  updateState: UpdateState;
  updateTrack: string;
  autoReviewInstructions: string;
  localToolPermission: "ask" | "always" | "never";
  /** boot scenario id (reconstruction harness affordance, not artifact truth) */
  scenario: string;
}

// kv namespaces recovered from the shipped renderer (memory-only here)
export const KV_NAMESPACES = [
  "client-meta.account-slot", "composer-drafts", "host-settings.onboarding",
  "roster.agent-avatars", "roster.last-roster", "selection.last-agent",
  "send-journal", "sidebar.last-sections", "transcript.replicas",
  "ui-agent-refs", "ui-layout", "other",
] as const;

// transcript item kinds recovered from the shipped renderer
export const TRANSCRIPT_ITEM_KINDS = [
  "text", "attachment", "widget", "cursor-agent", "secret-request", "email-draft",
  "slack-draft", "permission-request", "connector", "connectors", "listener-connect",
  "bot-template-share", "auto-review-approval", "local-tool-permission",
] as const;

/** Event-card ids recovered verbatim from the main bundle. */
export const EVENT_CARD_IDS = [
  "pr-opened", "pr-pushed", "pr-merged", "review-requested", "review-approved",
  "review-changes-requested", "review-commented", "pr-comment",
  "inline-review-comment", "review-thread-resolved", "review-thread-unresolved",
  "issue-assigned", "ci-passed", "ci-failed",
] as const;

// ---------- store ----------

export const state: AppState = {
  bots: [],
  rooms: [],
  routines: [],
  plugins: [],
  transcripts: new Map(),
  pageStack: [{ name: "chat", botId: "" }],
  sidebarCollapsed: false,
  showHiddenInSidebar: false,
  searchQuery: "",
  paletteOpen: false,
  theme: "system",
  updateState: "up-to-date",
  updateTrack: "stable",
  autoReviewInstructions: "",
  localToolPermission: "ask",
  scenario: "default",
};

export function currentPage(): Page {
  return state.pageStack[state.pageStack.length - 1]!;
}

export function pushPage(p: Page): void {
  state.pageStack.push(p);
  requestRender();
}

export function popPage(): void {
  if (state.pageStack.length > 1) state.pageStack.pop();
  requestRender();
}

export function resetPages(p: Page): void {
  state.pageStack = [p];
  requestRender();
}

export function botById(id: string): Bot | undefined {
  return state.bots.find((b) => b.id === id);
}

export function visibleBots(): Bot[] {
  return state.bots.filter((b) => !b.hidden || state.showHiddenInSidebar);
}

// ---------- render loop ----------

type Renderer = () => void;
let renderer: Renderer = () => {};
let queued = false;

export function setRenderer(r: Renderer): void {
  renderer = r;
}

export function requestRender(): void {
  if (queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    renderer();
  });
}

// ---------- dom helper ----------

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
