// Core surfaces: sidebar (design anchor) + chat/composer + transcript cards.
// Sidebar layout is the reconstruction's fixed anchor; only bugs/states change.
import { t } from "./labels.js";
import {
  botById, currentPage, el, popPage, pushPage, requestRender, state,
  visibleBots, type Bot, type TranscriptItem,
} from "./state.js";

// ---------- sidebar ----------

export function renderSidebar(root: HTMLElement): void {
  const sb = el("aside", "sidebar");
  if (state.sidebarCollapsed) {
    sb.classList.add("collapsed");
  }

  const head = el("div", "sidebar-head");
  const title = el("h2", undefined, t("sidebar"));
  const collapse = el("button", "icon-btn", state.sidebarCollapsed ? "»" : "«");
  collapse.title = t("collapseSidebar");
  collapse.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    requestRender();
  });
  head.append(title, collapse);
  sb.append(head);

  if (!state.sidebarCollapsed) {
    const search = el("input", "search") as HTMLInputElement;
    search.placeholder = t("searchBots");
    search.value = state.searchQuery;
    search.addEventListener("input", () => {
      state.searchQuery = search.value;
      requestRender();
    });
    sb.append(search);

    // bots grouped by section
    const bots = visibleBots().filter(
      (b) => !state.searchQuery || b.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
    );
    const sections = new Map<string | null, Bot[]>();
    for (const b of bots) {
      const k = b.sectionId;
      if (!sections.has(k)) sections.set(k, []);
      sections.get(k)!.push(b);
    }
    for (const [sectionId, group] of sections) {
      if (sectionId !== null) {
        const sh = el("div", "section-head", sectionId);
        sh.title = `${t("sectionActions")} · ${t("renameSection")} · ${t("moveToSection")}`;
        sb.append(sh);
      }
      for (const b of group) sb.append(botItem(b));
      if (group.length === 0 && sectionId === null) {
        sb.append(el("div", "empty-note", "No Bots yet. Create a few teammates and the network draws itself."));
      }
    }

    // rooms
    const channels = state.rooms.filter((r) => r.kind === "channel");
    const groups = state.rooms.filter((r) => r.kind === "group");
    if (channels.length || groups.length) {
      sb.append(el("h3", "room-title", t("channels")));
      for (const r of channels) sb.append(roomItem(r));
      if (groups.length) {
        sb.append(el("h3", "room-title", t("groups")));
        for (const r of groups) sb.append(roomItem(r));
      }
    }

    // footer actions
    const foot = el("div", "sidebar-foot");
    const newBtn = el("button", "new-btn", `＋ ${t("newBotOrChannel")}`);
    newBtn.addEventListener("click", () => pushPage({ name: "create-bot" }));
    foot.append(newBtn);

    const hiddenCount = state.bots.filter((b) => b.hidden).length;
    if (hiddenCount > 0) {
      const hiddenBtn = el("button", "link-btn", `${t("showHiddenBots")} (${hiddenCount})`);
      hiddenBtn.addEventListener("click", () => pushPage({ name: "hidden-chats" }));
      foot.append(hiddenBtn);
    }
    const orgBtn = el("button", "link-btn", t("orgChart"));
    orgBtn.addEventListener("click", () => pushPage({ name: "org-chart" }));
    foot.append(orgBtn);
    const settingsBtn = el("button", "link-btn", t("settings"));
    settingsBtn.addEventListener("click", () => pushPage({ name: "settings", tab: "general" }));
    foot.append(settingsBtn);
    sb.append(foot);
  }

  root.append(sb);
}

function botItem(b: Bot): HTMLElement {
  const page = currentPage();
  const active = page.name === "chat" && page.botId === b.id;
  const item = el("div", `bot-item${active ? " active" : ""}${b.hidden ? " hidden" : ""}`);
  const dot = el("span", "dot shape-" + b.avatar.shape);
  dot.style.setProperty("--avatar", b.avatar.color);
  item.append(dot);
  item.append(el("span", "name", b.name));
  if (b.state === "working") item.append(el("span", "badge working", "working")); // state label, visual-inference
  if (b.state === "attention") item.append(el("span", "badge attention", "!"));
  if (b.hidden) item.append(el("span", "badge", t("hiddenBots")));
  item.addEventListener("click", () => pushPage({ name: "chat", botId: b.id }));
  return item;
}

function roomItem(r: { id: string; kind: string; name: string }): HTMLElement {
  const item = el("div", "bot-item room");
  item.append(el("span", "room-glyph", r.kind === "channel" ? "#" : "👥"));
  item.append(el("span", "name", r.name));
  return item;
}

// ---------- chat ----------

export function renderChat(root: HTMLElement, botId: string): void {
  const main = el("main", "main");
  const b = botById(botId);
  const header = el("header", "page-header");

  const back = el("button", "icon-btn", "‹");
  back.title = "Back";
  back.addEventListener("click", () => popPage());
  header.append(back);
  if (b) {
    const dot = el("span", "dot sm shape-" + b.avatar.shape);
    dot.style.setProperty("--avatar", b.avatar.color);
    header.append(dot, el("h1", undefined, b.name));
  } else {
    header.append(el("h1", undefined, "Grok Bot"));
  }

  header.append(el("span", "spacer"));
  const teachBtn = el("button", undefined, t("teachTask"));
  teachBtn.addEventListener("click", () => pushPage({ name: "computer", botId }));
  const computerBtn = el("button", undefined, t("agentComputer"));
  computerBtn.addEventListener("click", () => pushPage({ name: "computer", botId }));
  const detailsBtn = el("button", undefined, t("botSettings"));
  detailsBtn.addEventListener("click", () => pushPage({ name: "bot-details", botId }));
  header.append(teachBtn, computerBtn, detailsBtn);
  main.append(header);

  const transcript = el("section", "transcript");
  const items = state.transcripts.get(botId) ?? [];
  if (items.length === 0) {
    transcript.append(el("div", "empty-center", b ? b.description || t("describeBot") : ""));
  }
  for (const item of items) transcript.append(renderItem(item));
  main.append(transcript);
  main.append(renderComposer());
  root.append(main);
}

function renderItem(item: TranscriptItem): HTMLElement {
  switch (item.kind) {
    case "text":
      return el("div", `msg ${item.role === "user" ? "user" : "bot"}`, item.text ?? "");
    case "widget": {
      const c = el("div", "card tool-card");
      c.append(el("h4", undefined, `${t("plugin")} activity — ${item.tool}`));
      c.append(el("div", "meta", item.detail ?? ""));
      return c;
    }
    case "cursor-agent": {
      const c = el("div", "card computer-card");
      c.append(el("h4", undefined, t("agentComputer")));
      c.append(el("div", "meta", item.detail ?? ""));
      const a = el("div", "actions");
      const takeOver = el("button", "primary", t("takeOver"));
      takeOver.addEventListener("click", () => pushPage({ name: "computer", botId: currentBotId() }));
      a.append(takeOver);
      c.append(a);
      return c;
    }
    case "permission-request":
    case "auto-review-approval": {
      const c = el("div", "card approval-card");
      c.append(el("h4", undefined, item.kind === "auto-review-approval" ? t("autoReviewApproval") : t("approvalNeeded")));
      c.append(el("div", "meta", `${item.text ?? ""} — ${item.detail ?? ""}`));
      const a = el("div", "actions");
      const approve = el("button", "primary", t("approve"));
      const always = el("button", undefined, t("alwaysAllow"));
      always.title = t("alwaysAllowed");
      const deny = el("button", undefined, t("denyOnce"));
      deny.title = `${t("deny")} (${t("denyOnce")})`;
      for (const btn of [approve, always, deny]) {
        btn.addEventListener("click", () => {
          item.pending = false;
          c.classList.add("resolved");
          a.remove();
          c.append(el("div", "meta resolved-label", `${btn.textContent} ✓`));
        });
      }
      a.append(approve, always, deny);
      c.append(a);
      return c;
    }
    case "secret-request": {
      // shipped card class: sand-secret-request; heading copy not recovered (visual-inference)
      const c = el("div", "card secret-card");
      c.append(el("h4", undefined, "Secret request"));
      c.append(el("div", "meta", item.detail ?? ""));
      const a = el("div", "actions");
      const share = el("button", "primary", `${t("shareSecretPrefix")}${item.detail?.split(" ")[0] ?? "secret"}`);
      share.addEventListener("click", () => {
        item.pending = false;
        a.remove();
        c.append(el("div", "meta resolved-label", `${t("requestSent")} it will be available to this run.`));
      });
      const deny = el("button", undefined, t("deny"));
      deny.addEventListener("click", () => {
        item.pending = false;
        a.remove();
        c.append(el("div", "meta resolved-label", `${t("deny")} — ${t("couldNotStoreSecret")} prevented.`));
      });
      a.append(share, deny);
      c.append(a);
      return c;
    }
  }
}

function currentBotId(): string {
  const p = currentPage();
  return p.name === "chat" ? p.botId : "";
}

function renderComposer(): HTMLElement {
  const composer = el("footer", "composer");
  const chips = el("div", "chips");
  const installed = state.plugins.filter((p) => p.installed);
  for (const p of installed.slice(0, 4)) chips.append(el("span", "chip", p.name));
  chips.append(el("span", "chip skill", "/release")); // visual-inference: example skill chip

  const row = el("div", "composer-row");
  const input = el("textarea", "composer-input") as HTMLTextAreaElement;
  input.rows = 1;
  input.placeholder = installed.length
    ? `Message…`
    : t("noToolsMatch");
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const id = currentBotId();
      const list = state.transcripts.get(id) ?? [];
      list.push({ kind: "text", role: "user", text }, { kind: "text", role: "bot", text: "Working on it." });
      state.transcripts.set(id, list);
      input.value = "";
      requestRender();
    }
  });

  const send = el("button", "primary send", t("send"));
  send.addEventListener("click", () => input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));

  row.append(input, send);
  composer.append(row, chips);
  return composer;
}
