// Artifact/docs-backed reconstruction surfaces + scenario registry.
// Every surface cites its evidence; nothing is invented beyond the cited contracts.
// Canonical screen ids come from the renderer topology (overlay:/view: anchors);
// method/command names come from src/wire/desktop-bridge.generated.ts and the
// coordinator atlas (evidence/curated/coordinator.md).
import { el } from "./dom.js";

export interface Scenario {
  /** canonical anchor id (renderer-topology.json semanticAnchors) or shell id */
  id: string;
  title: string;
  evidence: string[];
  render(root: HTMLElement): void;
}

interface BotFixture {
  id: string;
  name: string;
  state: "idle" | "working" | "hidden" | "pinned";
  avatarColor: string;
  group?: string;
}
const BOTS: BotFixture[] = [
  { id: "b1", name: "Daily driver", state: "pinned", avatarColor: "#c8d8c0", group: "Work" },
  { id: "b2", name: "Inbox triage", state: "working", avatarColor: "#c9d3e2", group: "Work" },
  { id: "b3", name: "Release notes", state: "idle", avatarColor: "#e2d3c9", group: "" },
  { id: "b4", name: "Old research", state: "hidden", avatarColor: "#d5d5cf", group: "" },
];

function card(title: string, meta?: string, actions?: string[], primaryIdx = 0) {
  const c = el("div", "card");
  c.append(el("h4", undefined, title));
  if (meta) c.append(el("div", "meta", meta));
  if (actions?.length) {
    const a = el("div", "actions");
    actions.forEach((label, i) => a.append(el("button", i === primaryIdx ? "primary" : undefined, label)));
    c.append(a);
  }
  return c;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "transcript",
    title: "Transcript",
    evidence: [
      "transcript cards: 21 registry entries (renderer-topology.json)",
      "reply kinds transcript-page/widget (coordinator.md)",
      "auto-review approval flow (vocabulary 'Auto-review')",
    ],
    render(root) {
      const t = el("section", "transcript");
      t.dataset.scenario = "transcript";
      t.append(el("div", "msg user", "Check CI on my repo and fix any red workflow."));
      t.append(el("div", "msg bot", "Looking at the failing workflow now."));
      t.append(card("Tool activity — github", "runs.list → 1 failed (typecheck)"));
      t.append(card("Computer activity", "Agent Computer — browser opened to Actions tab · Take over available"));
      t.append(card("Approval required", "push fix commit to main? — auto-review: Require Approval", ["Approve once", "Always allow"]));
      t.append(card("Secret request", "needs NPM_TOKEN to publish", ["Share secret", "Deny"]));
      t.append(card("Local tool requested", "wants to run local command: npm test — permission ceiling applies"));
      t.append(el("div", "msg bot", "Waiting on your approval to continue."));
      root.append(t);
    },
  },
  {
    id: "onboarding-tool-picker",
    title: "Onboarding — tool picker",
    evidence: [
      "vocabulary confirmed: 'What do you use every day?' (index chunk)",
      "getOnboardingSeen/setOnboardingSeen (desktop-bridge)",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "onboarding";
      s.append(el("h1", undefined, "What do you use every day?"));
      const grid = el("div", "picker-grid");
      for (const t of ["Gmail", "Calendar", "Drive", "GitHub"]) grid.append(card(t, undefined, ["Connect"]));
      s.append(grid, el("button", "primary", "Continue"));
      root.append(s);
    },
  },
  {
    id: "bot-create",
    title: "Bot creation — avatar",
    evidence: [
      "createAgent / generateAgentAvatarImage (desktop-bridge)",
      "avatar color fixtures mirror --sand-* neutral palette",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "bot-create";
      s.append(el("h1", undefined, "Create custom bot"));
      const row = el("div", "avatar-row");
      for (const shape of ["circle", "squircle"]) {
        const opt = el("div", `avatar-shape ${shape}`);
        opt.dataset.shape = shape;
        row.append(opt);
      }
      for (const c of ["#c8d8c0", "#c9d3e2", "#e2d3c9", "#d5d5cf", "#111111"]) {
        const sw = el("div", "avatar-color");
        (sw as HTMLElement).style.background = c;
        row.append(sw);
      }
      s.append(row, card("Describe this bot", "generateAgentAvatarImage({ description })"));
      root.append(s);
    },
  },
  {
    id: "bot-details",
    title: "Bot details",
    evidence: [
      "updateComputer / kickstartAgent / interruptAgentRun (coordinator.md)",
      "'A computer update names the agent by its string id.' (MAIN_RPC_CONSTRAINTS)",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "bot-details";
      s.append(el("h1", undefined, "Daily driver"));
      s.append(card("Computer", "updateComputer({ id, requestId }) — upgrade schedule: none", ["Schedule upgrade", "Cancel"]));
      s.append(card("Run control", "kickstartAgent · interruptAgentRun · broadcastToAgents", ["Kickstart", "Interrupt"]));
      root.append(s);
    },
  },
  {
    id: "routines-editor",
    title: "Routines editor",
    evidence: [
      "automations: create/update/deleteAgentAutomation, runAgentAutomationNow, setAgentAutomationEnabled (coordinator.md)",
      "trigger kinds: schedule + event (automation webhook credential exists)",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "routines";
      s.append(el("h1", undefined, "Routine: Inbox triage"));
      s.append(card("Trigger — schedule", "cron-style run times; getAutomationWebhookCredential for event triggers", ["Edit schedule"]));
      s.append(card("Trigger — event", "fires when an event arrives via automation webhook", ["Configure"]));
      s.append(card("Actions", "runAgentWorkflowNow against linked workflows", ["Add action"]));
      root.append(s);
    },
  },
  {
    id: "plugins-marketplace",
    title: "Plugins — marketplace & yours",
    evidence: [
      "surface overlay:plugins (semanticAnchors)",
      "skillsCatalog / syncPluginSkills / getListenerIntegrations (coordinator.md)",
      "Google OAuth scopes proven in host bundle",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "plugins";
      s.append(el("h1", undefined, "Plugins"));
      const tabs = el("div", "tabs");
      tabs.append(el("span", "tab active", "Marketplace"), el("span", "tab", "Yours"));
      s.append(tabs);
      s.append(card("@gmail", "OAuth scope: gmail.readonly (proven)", ["Install"], 0));
      s.append(card("@calendar", "OAuth scope: calendar.events", ["Install"]));
      root.append(s);
    },
  },
  {
    id: "settings",
    title: "Settings",
    evidence: [
      "surface overlay:settings (+ /usage, /beta variants) (semanticAnchors)",
      "theme/language/egress/webauthn/timezone setters (desktop-bridge)",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "settings";
      s.append(el("h1", undefined, "Settings"));
      for (const [k, v] of Object.entries({
        "Appearance": "setThemePreference · setTitleBarOverlayTone",
        "Language": "setLanguagePreference",
        "Egress tunnel": "getEgressTunnelEnabled / setEgressTunnelEnabled",
        "WebAuthn proxy": "getWebauthnProxyEnabled / setWebauthnProxyEnabled",
        "Time zone": "setTimeZoneOverride({ timeZone: string | null })",
        "Updates": "checkForUpdates · quitAndInstallUpdate",
      })) s.append(card(k, v));
      root.append(s);
    },
  },
  {
    id: "computer-takeover-teach",
    title: "Agent Computer — take over & teach",
    evidence: [
      "surface overlay:computer (semanticAnchors)",
      "vocabulary: 'Take over', 'Teach a task', 'Agent Computer'",
      "VNC presence events vnc-user-presence; startTeachRecording/stopTeachRecording",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "computer";
      s.append(el("h1", undefined, "Agent Computer"));
      s.append(card("Live view", "VNC pane with presence indicator (vnc-user-presence)", ["Take over"]));
      s.append(card("Teach a task", "records your steps into a reusable routine", ["Start recording", "Stop recording"]));
      root.append(s);
    },
  },
  {
    id: "org-chart-network",
    title: "Org chart / agent network",
    evidence: [
      "surface view:org-chart + overlay:network (semanticAnchors)",
      "group commands: createGroup, setGroupMembers, createRoomFromAgent (coordinator.md)",
      "'suggested teammate' vocabulary target (unconfirmed in bundle — flagged)",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "org-chart";
      s.append(el("h1", undefined, "Org chart"));
      for (const g of ["Work", "Personal"]) {
        const grp = el("div", "card");
        grp.append(el("h4", undefined, g));
        grp.append(el("div", "meta", BOTS.filter((b) => b.group === g).map((b) => b.name).join(", ") || "(empty)"));
        s.append(grp);
      }
      s.append(card("Network", "shared rooms + listeners across agents", ["Open network"]));
      root.append(s);
    },
  },
  {
    id: "command-palette",
    title: "Command palette",
    evidence: [
      "surface kind 'palette' (topology surfaces enum)",
      "commands sourced from MAIN_RPC_METHODS + coordinator bridge",
    ],
    render(root) {
      const s = el("section", "surface palette-surface");
      s.dataset.scenario = "palette";
      const box = el("input") as HTMLInputElement;
      box.placeholder = "Type a command…";
      const list = el("ul", "palette-list");
      for (const cmd of ["New bot", "Toggle egress tunnel", "Check for updates", "Reveal secret…", "Start teach recording"]) list.append(el("li", undefined, cmd));
      s.append(box, list);
      root.append(s);
    },
  },
  {
    id: "hidden-chats",
    title: "Hidden chats",
    evidence: [
      "surface overlay:hidden-chats (semanticAnchors)",
      "bot state hidden in sidebar fixtures mirrors visibility toggle",
    ],
    render(root) {
      const s = el("section", "surface");
      s.dataset.scenario = "hidden-chats";
      s.append(el("h1", undefined, "Hidden chats"));
      s.append(card("Old research", "unhide to return it to the sidebar", ["Unhide"]));
      root.append(s);
    },
  },
];

/** sidebar stays the design anchor: pins, hides, groups, channels */
export function renderSidebar(root: HTMLElement) {
  const sb = el("aside", "sidebar");
  sb.dataset.surface = "sidebar";
  sb.append(el("h2", undefined, "Bots"));
  const groups = new Map<string, BotFixture[]>();
  for (const b of BOTS) {
    if (b.state === "hidden") continue;
    const key = b.group || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(b);
  }
  for (const [group, members] of groups) {
    if (group) sb.append(el("h2", "group-label", group));
    for (const b of members) {
      const item = el("div", "bot-item");
      item.dataset.botId = b.id;
      item.style.setProperty("--avatar", b.avatarColor);
      item.append(el("span", "dot"), el("span", "name", b.name));
      if (b.state === "working") item.append(el("span", "badge working", "working"));
      if (b.state === "pinned") item.append(el("span", "badge", "pinned"));
      sb.append(item);
    }
  }
  sb.append(el("h2", undefined, "Channels"));
  for (const ch of ["release-feed", "standup"]) sb.append(el("div", "channel-item", "#" + ch));
  root.append(sb);
}
