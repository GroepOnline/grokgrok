// Clean-room reconstruction shell for Grok Bot 0.24 surfaces.
// Data shapes mirror artifact-proven contracts (see src/wire/*.generated.ts,
// claims/ledger.json). Scenario fixtures stand in for the page-stack views the
// shipped app navigates internally (no URL router — CLM-008).
// Build: npm run build:desktop   Serve: apps/desktop/dist

interface BotFixture {
  id: string;
  name: string;
  state: "idle" | "working" | "hidden" | "pinned";
  avatarColor: string;
}

interface TranscriptItem {
  kind: "user-msg" | "bot-msg" | "tool-activity" | "computer-activity"
    | "approval-request" | "secret-request";
  text?: string;
  tool?: string;
  detail?: string;
}

const BOTS: BotFixture[] = [
  { id: "b1", name: "Daily driver", state: "pinned", avatarColor: "#c8d8c0" },
  { id: "b2", name: "Inbox triage", state: "working", avatarColor: "#c9d3e2" },
  { id: "b3", name: "Release notes", state: "idle", avatarColor: "#e2d3c9" },
  { id: "b4", name: "Old research", state: "hidden", avatarColor: "#d5d5cf" },
];

const TRANSCRIPT: TranscriptItem[] = [
  { kind: "user-msg", text: "Check CI on my repo and fix any red workflow." },
  { kind: "bot-msg", text: "Looking at the failing workflow now." },
  { kind: "tool-activity", tool: "github", detail: "runs.list → 1 failed (typecheck)" },
  { kind: "computer-activity", detail: "Agent Computer — browser opened to Actions tab" },
  {
    kind: "approval-request",
    text: "push fix commit to main?",
    detail: "auto-review: Require Approval",
  },
  { kind: "secret-request", detail: "needs NPM_TOKEN to publish" },
  { kind: "bot-msg", text: "Waiting on your approval to continue." },
];

const PLUGINS = ["@gmail", "@calendar", "@drive"]; // Google scopes proven in host bundle
const SKILLS = ["/release", "/triage", "/standup"];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, textContent?: string) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (textContent !== undefined) n.textContent = textContent;
  return n;
}

function renderSidebar(root: HTMLElement) {
  const sb = el("aside", "sidebar");
  sb.append(el("h2", undefined, "Bots"));
  for (const b of BOTS) {
    const item = el("div", `bot-item${b.state === "hidden" ? "" : ""}`);
    item.append(el("span", "dot"));
    item.style.setProperty("--avatar", b.avatarColor);
    item.append(el("span", `name${b.state === "hidden" ? " hidden" : ""}`, b.name));
    if (b.state === "working") item.append(el("span", "badge working", "working"));
    if (b.state === "pinned") item.append(el("span", "badge", "pinned"));
    sb.append(item);
  }
  root.append(sb);
}

function renderItem(t: TranscriptItem): HTMLElement {
  switch (t.kind) {
    case "user-msg":
      return el("div", "msg user", t.text);
    case "bot-msg":
      return el("div", "msg bot", t.text);
    case "tool-activity": {
      const c = el("div", "card");
      c.append(el("h4", undefined, `Tool activity — ${t.tool}`));
      c.append(el("div", "meta", t.detail ?? ""));
      return c;
    }
    case "computer-activity": {
      const c = el("div", "card");
      c.append(el("h4", undefined, "Computer activity"));
      c.append(el("div", "meta", `${t.detail} · Take over available`));
      return c;
    }
    case "approval-request": {
      const c = el("div", "card");
      c.append(el("h4", undefined, "Approval required"));
      c.append(el("div", "meta", t.text + " — " + t.detail));
      const a = el("div", "actions");
      a.append(el("button", "primary", "Approve once"), el("button", undefined, "Always allow"));
      c.append(a);
      return c;
    }
    case "secret-request": {
      const c = el("div", "card");
      c.append(el("h4", undefined, "Secret request"));
      c.append(el("div", "meta", t.detail + ""));
      const a = el("div", "actions");
      a.append(el("button", "primary", "Share secret"), el("button", undefined, "Deny"));
      c.append(a);
      return c;
    }
  }
}

function renderMain(root: HTMLElement) {
  const main = el("main", "main");
  const transcript = el("section", "transcript");
  for (const t of TRANSCRIPT) transcript.append(renderItem(t));

  const composer = el("footer", "composer");
  const input = el("input") as HTMLInputElement;
  input.placeholder = `Message… (${PLUGINS.join(" ")} plugins, ${SKILLS[0]} skills)`;
  composer.append(input, el("span", "hint", "Enter to send"));

  main.append(transcript, composer, el("div", "panel-note",
    "Clean-room reconstruction shell — fixtures only; no proprietary code."));
  root.append(main);
}

const app = document.getElementById("app")!;
renderSidebar(app);
renderMain(app);

// self-check when run under node --test style import guard
if (typeof process !== "undefined" && process.env["GROKGROK_SELFTEST"]) {
  console.assert(BOTS.length === 4, "sidebar fixtures present");
  console.assert(TRANSCRIPT.some((t) => t.kind === "approval-request"), "approval card present");
}
