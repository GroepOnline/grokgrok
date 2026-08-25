// Secondary surfaces: onboarding/tool selector, create-bot avatar picker,
// bot details, routines editor, Agent Computer, plugins, settings panes,
// hidden chats, org chart, command palette.
import { t } from "./labels.js";
import {
  botById, el, popPage, pushPage, requestRender, state, visibleBots, type Bot,
} from "./state.js";

const ROLE_IDS = [
  "roleMarketingAnalyst", "roleOutreach", "roleQaEngineer", "roleResearcher",
  "roleExpenseAuditor", "roleWinLossAnalyst",
] as const;

const SHAPES = ["circle", "square", "blob"] as const;
const AVATAR_COLORS = ["#c8d8c0", "#c9d3e2", "#e2d3c9", "#d5d5cf", "#d9e2d3", "#e2dcc9", "#c9cfe2", "#e2c9cf"];

function pageHeader(title: string): HTMLElement {
  const header = el("header", "page-header");
  const back = el("button", "icon-btn", "‹");
  back.addEventListener("click", () => popPage());
  header.append(back, el("h1", undefined, title));
  return header;
}

// onboarding tool-selector (shipped step order: roles -> details)
function renderRoleSelector(root: HTMLElement): void {
  const main = el("main", "main onboarding");
  main.append(el("h1", "onboard-title", t("whatDaily")));
  main.append(el("p", "onboard-sub", t("meetTeammate")));

  const grid = el("div", "role-grid");
  for (const id of ROLE_IDS) {
    const card = el("button", "role-card", t(id));
    card.addEventListener("click", () => {
      draftName = t(id);
      createStep = "details";
      requestRender();
    });
    grid.append(card);
  }
  main.append(grid);

  const custom = el("button", "primary", t("createFirstBot"));
  custom.addEventListener("click", () => {
    draftName = "";
    createStep = "details";
    requestRender();
  });
  main.append(custom);
  root.append(main);
}

// ---------- create-bot (avatar shape/color picker) ----------

let draftAvatar = { shape: "blob" as Bot["avatar"]["shape"], color: AVATAR_COLORS[0]! };
let draftName = "";
let draftDesc = "";
/** "roles" = shipped onboarding tool-selector step; "details" = bot form. */
let createStep: "roles" | "details" = "roles";

export function setCreateStep(step: "roles" | "details"): void {
  createStep = step;
}

export function renderCreateBot(root: HTMLElement): void {
  if (createStep === "roles") {
    renderRoleSelector(root);
    return;
  }
  const main = el("main", "main create-bot");
  const header = pageHeader(t("newBotOrChannel"));
  header.querySelector("button")?.addEventListener("click", () => {
    createStep = "roles";
    popPage();
  });
  main.append(header);

  const form = el("div", "form");
  form.append(el("h2", "form-title", t("nameYourBot")));
  form.append(el("p", "form-sub", t("nameTeammate")));

  const nameInput = el("input") as HTMLInputElement;
  nameInput.placeholder = t("whatHelpWith");
  nameInput.value = draftName;
  nameInput.addEventListener("input", () => { draftName = nameInput.value; });
  form.append(wrapField(t("name"), nameInput));

  const desc = el("textarea") as HTMLTextAreaElement;
  desc.rows = 3;
  desc.placeholder = t("describeBot");
  desc.value = draftDesc;
  desc.addEventListener("input", () => { draftDesc = desc.value; });
  form.append(wrapField(t("instructions"), desc));

  // avatar editor
  form.append(el("h2", "form-title", t("editBotAvatar")));
  const editor = el("div", "avatar-editor");
  editor.append(el("span", "editor-caption", t("avatarEditor")));

  const previewWrap = el("div", "avatar-preview-wrap");
  const preview = el("div", `dot lg shape-${draftAvatar.shape}`);
  preview.style.setProperty("--avatar", draftAvatar.color);
  previewWrap.append(preview);

  const shapeRow = el("div", "shape-row");
  shapeRow.append(el("span", "field-label", t("characterShape")));
  for (const s of SHAPES) {
    const b = el("button", `shape-btn${draftAvatar.shape === s ? " selected" : ""}`, s);
    b.addEventListener("click", () => {
      // visual-inference: exact shipped shape set unknown; circle/square/blob are our neutral set
      draftAvatar.shape = s;
      requestRender();
    });
    shapeRow.append(b);
  }
  const shuffle = el("button", undefined, t("shuffle"));
  shuffle.addEventListener("click", () => {
    draftAvatar.color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]!;
    requestRender();
  });

  const describe = el("input") as HTMLInputElement;
  describe.placeholder = t("describeAvatarPh");
  describe.title = `${t("describeAvatar")} — ${t("generatingAvatar")} is not simulated in this shell`;

  const source = el("div", "meta", `${t("avatarSource")}: generated`);

  editor.append(previewWrap, shapeRow, shuffle, describe, source);
  form.append(editor);

  const actions = el("div", "actions");
  const create = el("button", "primary", t("createFirstBot"));
  create.textContent = t("create");
  create.addEventListener("click", () => {
    const id = "b" + (state.bots.length + 1) + "-" + Date.now();
    state.bots.push({
      id,
      name: draftName.trim() || "New Bot",
      description: draftDesc,
      instructions: draftDesc,
      model: "grok-4",
      plugins: [],
      skills: [],
      avatar: { ...draftAvatar },
      hidden: false,
      sectionId: null,
      state: "idle",
    });
    draftName = ""; draftDesc = "";
    createStep = "roles";
    resetToChat(id);
  });
  actions.append(create);
  form.append(actions);
  main.append(form);
  root.append(main);
}

function resetToChat(botId: string): void {
  state.pageStack = [{ name: "chat", botId }];
  requestRender();
}

function wrapField(label: string, input: HTMLElement): HTMLElement {
  const w = el("label", "field");
  w.append(el("span", "field-label", label), input);
  return w;
}

// ---------- bot details ----------

export function renderBotDetails(root: HTMLElement, botId: string): void {
  const b = botById(botId);
  const main = el("main", "main");
  main.append(pageHeader(t("botSettings")));
  if (!b) { root.append(main); return; }

  const form = el("div", "form");
  const nameInput = el("input") as HTMLInputElement;
  nameInput.value = b.name;
  nameInput.addEventListener("input", () => { b.name = nameInput.value; requestRender(); });
  form.append(wrapField(t("name"), nameInput));

  const modelSel = el("select") as HTMLSelectElement;
  for (const m of ["grok-4", "grok-4-fast"]) {
    const o = el("option", undefined, m);
    o.value = m;
    if (b.model === m) o.selected = true;
    modelSel.append(o);
  }
  modelSel.addEventListener("change", () => { b.model = modelSel.value; });
  form.append(wrapField(t("model"), modelSel));

  const instr = el("textarea") as HTMLTextAreaElement;
  instr.rows = 5;
  instr.value = b.instructions || b.description;
  instr.placeholder = t("describeBot");
  instr.addEventListener("input", () => { b.instructions = instr.value; });
  form.append(wrapField(t("instructions"), instr));
  main.append(form);

  // routines section
  const routinesSec = el("section", "detail-section");
  routinesSec.append(el("h2", "form-title", t("routines")));
  routinesSec.append(el("p", "meta", t("routinesBlurb")));
  const list = el("div", "routine-list");
  const mine = state.routines.filter((r) => r.botId === botId);
  for (const r of mine) {
    const row = el("div", "routine-row");
    row.append(el("span", "routine-name", r.name), el("span", "meta", r.trigger.spec));
    row.addEventListener("click", () => pushPage({ name: "routines", botId, routineId: r.id }));
    list.append(row);
  }
  const addRoutine = el("button", undefined, t("createRoutine"));
  addRoutine.addEventListener("click", () => pushPage({ name: "routines", botId }));
  list.append(addRoutine);
  routinesSec.append(list);
  main.append(routinesSec);
  root.append(main);
}

// ---------- routines editor ----------

export function renderRoutines(root: HTMLElement, botId: string, routineId?: string): void {
  const main = el("main", "main");
  const backHeader = el("header", "page-header");
  const back = el("button", "icon-btn", "‹");
  back.addEventListener("click", () => {
    state.pageStack = [{ name: "bot-details", botId }];
    requestRender();
  });
  backHeader.append(back, el("h1", undefined, t("backToRoutines")));
  main.append(backHeader);

  const routine = routineId ? state.routines.find((r) => r.id === routineId) : undefined;
  const form = el("div", "form");

  const title = el("input") as HTMLInputElement;
  title.placeholder = t("nameThisRoutine");
  title.value = routine?.name ?? "";
  form.append(wrapField(t("routine"), title));

  form.append(el("p", "form-sub", t("routineRunsPrompt")));
  const prompt = el("textarea") as HTMLTextAreaElement;
  prompt.rows = 4;
  prompt.value = routine?.prompt ?? "";

  form.append(wrapField(t("instructions"), prompt));

  // triggers
  form.append(el("h2", "form-title", t("triggers")));
  const trigger = routine?.trigger ?? { source: "schedule" as const, spec: "", fields: {} };
  form.append(wrapField(t("triggerSource"), el("div", "meta", trigger.source)));
  form.append(wrapField(t("addTrigger"), el("div", "meta", trigger.spec || t("afterSave"))));
  const fields = el("pre", "code-block", JSON.stringify(trigger.fields, null, 2) || "{}");
  form.append(wrapField(t("triggerFields"), fields));

  const save = el("button", "primary", t("createRoutine"));
  save.textContent = routine ? "Save" : t("createRoutine"); // visual-inference: save copy not recovered
  save.addEventListener("click", () => {
    if (routine) {
      routine.name = title.value;
      routine.prompt = prompt.value;
    } else {
      state.routines.push({
        id: "rt" + Date.now(), botId, name: title.value, prompt: prompt.value,
        trigger: { source: "schedule", spec: "Every day · 09:00", fields: { time: "09:00" } },
        enabled: true,
      });
    }
    requestRender();
    state.pageStack = [{ name: "bot-details", botId }];
    requestRender();
  });
  form.append(save);
  main.append(form);
  root.append(main);
}

// ---------- agent computer / take over / teach ----------

export function renderComputer(root: HTMLElement, botId: string): void {
  const main = el("main", "main");
  main.append(pageHeader(t("agentComputer")));

  const b = botById(botId);
  const wrap = el("div", "computer-view");
  const strip = el("div", "computer-strip");
  strip.append(
    el("span", "badge working", b?.state === "working" ? "in use" : "idle"),
    el("span", "meta", b && b.model ? `${b.name} · ${t("runsCloud")}` : t("runsLocal")),
  );

  // Computer preview pane — visual-inference geometry (no artifact screenshot truth)
  const previewCard = el("div", "computer-preview");
  previewCard.append(el("div", "preview-title", t("computerPreview")));
  const screen = el("div", "preview-screen");
  screen.append(el("div", "preview-note", t("grokComputer")));
  previewCard.append(screen);

  const actions = el("div", "actions");
  const open = el("button", "primary", t("openComputer"));
  open.addEventListener("click", () => popPage());
  const takeOver = el("button", undefined, t("takeOver"));
  const teach = el("button", undefined, t("teachTask"));
  actions.append(open, takeOver, teach);

  wrap.append(strip, previewCard, actions);
  main.append(wrap);
  root.append(main);
}

// ---------- plugins ----------

export function renderPlugins(root: HTMLElement): void {
  const main = el("main", "main");
  main.append(pageHeader(t("plugins")));
  const grid = el("div", "plugin-grid");
  for (const p of state.plugins) {
    const card = el("div", `card plugin-card${p.installed ? "" : " uninstalled"}`);
    card.append(el("h4", undefined, p.name));
    card.append(el("div", "meta", p.installed ? p.scopes.join(", ") : t("plugin")));
    const a = el("div", "actions");
    const btn = el("button", p.installed ? undefined : "primary");
    btn.textContent = p.installed ? t("uninstall") : t("install");
    btn.addEventListener("click", () => {
      p.installed = !p.installed;
      requestRender();
    });
    a.append(btn);
    card.append(a);
    grid.append(card);
  }
  main.append(grid);
  root.append(main);
}

// ---------- settings ----------

const SETTINGS_TABS = ["general", "plugins", "appearance", "updates"] as const;

export function renderSettings(root: HTMLElement, tab: (typeof SETTINGS_TABS)[number]): void {
  const main = el("main", "main");
  main.append(pageHeader(`${t("settings")} · ${tabTitle(tab)}`));

  const tabs = el("nav", "tabs");
  for (const tb of SETTINGS_TABS) {
    const b = el("button", `tab${tb === tab ? " active" : ""}`, tabTitle(tb));
    b.addEventListener("click", () => {
      state.pageStack[state.pageStack.length - 1] = { name: "settings", tab: tb };
      requestRender();
    });
    tabs.append(b);
  }
  main.append(tabs);

  const body = el("div", "settings-body");
  if (tab === "general") renderGeneralPane(body);
  else if (tab === "plugins") renderPluginsPane(body);
  else if (tab === "appearance") renderAppearancePane(body);
  else renderUpdatesPane(body);
  main.append(body);
  root.append(main);
}

function tabTitle(tab: (typeof SETTINGS_TABS)[number]): string {
  switch (tab) {
    case "general": return t("general");
    case "plugins": return t("plugins");
    case "appearance": return t("appearance");
    case "updates": return t("updates");
  }
}

function renderGeneralPane(body: HTMLElement): void {
  body.append(el("h2", "form-title", t("localToolPermissions")));
  const sel = el("select") as HTMLSelectElement;
  for (const v of ["ask", "always", "never"] as const) {
    const o = el("option", undefined, v === "ask" ? "Ask every time" : v === "always" ? t("alwaysAllowed") : t("deny"));
    o.value = v;
    if (state.localToolPermission === v) o.selected = true;
    sel.append(o);
  }
  sel.addEventListener("change", () => { state.localToolPermission = sel.value as typeof state.localToolPermission; });
  body.append(wrapField(t("localToolPermission"), sel));

  body.append(el("h2", "form-title", t("autoReviewApproval")));
  const ar = el("textarea") as HTMLTextAreaElement;
  ar.rows = 3;
  ar.value = state.autoReviewInstructions;
  ar.placeholder = t("describeAvatar"); // placeholder only; visual-inference
  ar.addEventListener("input", () => { state.autoReviewInstructions = ar.value; });
  body.append(ar);
}

function renderPluginsPane(body: HTMLElement): void {
  const openBtn = el("button", "primary", t("plugins"));
  openBtn.addEventListener("click", () => pushPage({ name: "plugins" }));
  body.append(openBtn);
  const list = el("ul", "plain-list");
  for (const p of state.plugins.filter((x) => x.installed)) {
    list.append(el("li", undefined, `${p.name} — ${p.scopes.join(", ")}`));
  }
  body.append(list);
}

function renderAppearancePane(body: HTMLElement): void {
  body.append(el("h2", "form-title", t("theme")));
  const group = el("div", "seg-group");
  for (const [id, label] of [
    ["themeLight", t("light")], ["themeDark", t("dark")], ["themeSystem", t("system")],
  ] as const) {
    const pref = id === "themeLight" ? "light" : id === "themeDark" ? "dark" : "system";
    const b = el("button", `seg${state.theme === pref ? " selected" : ""}`, label);
    b.title = pref === "system" ? t("systemDefault") : `Theme: ${label}`;
    b.addEventListener("click", () => {
      state.theme = pref as typeof state.theme;
      document.documentElement.dataset["theme"] = pref;
      requestRender();
    });
    group.append(b);
  }
  body.append(group);
}

function renderUpdatesPane(body: HTMLElement): void {
  body.append(el("h2", "form-title", t("updates")));
  const statusLine = el("p", "meta");
  const applyUpdateState = () => {
    switch (state.updateState) {
      case "up-to-date": statusLine.textContent = `Version 0.24.0 — ${t("checkForUpdates")} ✓`; break;
      case "checking": statusLine.textContent = `${t("checkForUpdates")}…`; break;
      case "ready": statusLine.textContent = `${t("updateReady")} — ${t("restartToUpdate")}`; break;
      case "disabled": statusLine.textContent = t("updatesFollowTrack") + "(disabled)"; break;
    }
  };
  applyUpdateState();

  const check = el("button", "primary", t("checkForUpdates"));
  check.addEventListener("click", () => {
    state.updateState = "checking";
    applyUpdateState();
    setTimeout(() => {
      state.updateState = Math.random() < 0.5 ? "ready" : "up-to-date";
      applyUpdateState();
    }, 600);
  });

  const restart = el("button", undefined, t("restartToUpdate"));
  restart.disabled = state.updateState !== "ready";

  body.append(statusLine, check, restart);
  body.append(el("p", "meta", `${t("updatesFollowTrack")}${state.updateTrack} channel`));
}

// ---------- hidden chats ----------

export function renderHiddenChats(root: HTMLElement): void {
  const main = el("main", "main");
  main.append(pageHeader(t("hcHiddenBots")));
  main.append(el("p", "meta", t("hcHiddenBlurb")));
  const hidden = state.bots.filter((b) => b.hidden);
  if (hidden.length === 0) {
    main.append(el("p", "empty-center", t("hcAllBotsHidden")));
  } else {
    const list = el("div", "hidden-list");
    for (const b of hidden) {
      const row = el("div", "bot-item");
      const dot = el("span", "dot shape-" + b.avatar.shape);
      dot.style.setProperty("--avatar", b.avatar.color);
      const show = el("button", "link-btn", t("showHiddenBots"));
      show.addEventListener("click", () => {
        b.hidden = false;
        requestRender();
      });
      row.append(dot, el("span", "name", b.name), show);
      list.append(row);
    }
    main.append(list);
  }
  main.append(el("p", "meta", `${t("hcAllBotsCount")}${state.bots.length})`));
  root.append(main);
}

// ---------- org chart / agent network ----------

export function renderOrgChart(root: HTMLElement): void {
  const main = el("main", "main org-chart");
  const header = pageHeader(t("orgChart"));
  const close = el("button", "icon-btn", "✕");
  close.title = t("closeOrgChart");
  close.addEventListener("click", () => popPage());
  header.append(close);
  main.append(header);
  main.append(el("h2", "form-title", t("botNetwork")));
  main.append(el("p", "meta", t("networkLegend")));

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "network-svg");
  svg.setAttribute("viewBox", "0 0 640 360");

  const bots = visibleBots();
  if (bots.length === 0) {
    main.append(el("p", "empty-center", t("noBotsYetNetwork")));
    root.append(main);
    return;
  }

  // deterministic ring layout (visual-inference: shipped layout algorithm unknown)
  const cx = 320, cy = 180, R = 120;
  const pos = new Map<string, [number, number]>();
  bots.forEach((b, i) => {
    const a = (2 * Math.PI * i) / Math.max(bots.length, 1) - Math.PI / 2;
    pos.set(b.id, [cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  });

  // group membership edges = dashed; co-membership in rooms = solid
  for (const room of state.rooms) {
    const dashed = room.kind === "group" ? "dash" : "solid";
    for (let i = 0; i < room.members.length; i++) {
      for (let j = i + 1; j < room.members.length; j++) {
        const p1 = pos.get(room.members[i]!);
        const p2 = pos.get(room.members[j]!);
        if (!p1 || !p2) continue;
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(p1[0])); line.setAttribute("y1", String(p1[1]));
        line.setAttribute("x2", String(p2[0])); line.setAttribute("y2", String(p2[1]));
        line.setAttribute("class", `edge ${dashed}`);
        svg.append(line);
      }
    }
  }

  for (const b of bots) {
    const p = pos.get(b.id)!;
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "node");
    g.setAttribute("transform", `translate(${p[0]},${p[1]})`);
    const c = document.createElementNS(svgNS, "circle");
    c.setAttribute("r", "18");
    c.setAttribute("fill", b.avatar.color);
    c.setAttribute("data-bot-id", b.id);
    c.addEventListener("click", () => pushPage({ name: "chat", botId: b.id }));
    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("y", "32");
    label.setAttribute("text-anchor", "middle");
    label.textContent = b.name;
    g.append(c, label);
    svg.append(g);
  }
  main.append(svg);

  const details = el("details", "org-details");
  details.append(el("summary", undefined, t("orgChartDetails")));
  details.append(el("pre", "code-block", JSON.stringify(
    state.rooms.map((r) => ({ kind: r.kind, name: r.name, members: r.members })), null, 2,
  )));
  main.append(details);
  root.append(main);
}

// ---------- command palette ----------

const PALETTE_COMMANDS = [
  { label: "New Bot or Channel", run: () => pushPage({ name: "create-bot" }) },
  { label: "Org chart", run: () => pushPage({ name: "org-chart" }) },
  { label: "Settings · General", run: () => pushPage({ name: "settings", tab: "general" }) },
  { label: "Settings · Appearance", run: () => pushPage({ name: "settings", tab: "appearance" }) },
  { label: "Settings · Updates", run: () => pushPage({ name: "settings", tab: "updates" }) },
  { label: "Routines", run: () => pushPage({ name: "routines", botId: firstBotId() }) },
  { label: "Agent Computer", run: () => pushPage({ name: "computer", botId: firstBotId() }) },
] as const;

function firstBotId(): string {
  return visibleBots()[0]?.id ?? "";
}

export function renderPalette(root: HTMLElement): void {
  if (!state.paletteOpen) return;
  const overlay = el("div", "palette-overlay");
  overlay.addEventListener("click", () => {
    state.paletteOpen = false;
    requestRender();
  });
  const box = el("div", "palette");
  box.addEventListener("click", (ev) => ev.stopPropagation());

  const input = el("input", "palette-input") as HTMLInputElement;
  input.placeholder = t("search");
  box.append(input);

  box.append(el("div", "palette-section", t("suggestions")));
  const listEl = el("div", "palette-list");

  const rebuild = () => {
    listEl.replaceChildren();
    const q = input.value.toLowerCase();
    for (const cmd of PALETTE_COMMANDS) {
      if (q && !cmd.label.toLowerCase().includes(q)) continue;
      const item = el("button", "palette-item", cmd.label);
      item.addEventListener("click", () => {
        state.paletteOpen = false;
        cmd.run();
      });
      listEl.append(item);
    }
    if (!listEl.children.length) {
      listEl.append(el("div", "empty-note", `${t("noToolsMatch")}${input.value}”`));
    }
  };
  input.addEventListener("input", rebuild);
  rebuild();
  box.append(listEl);
  overlay.append(box);
  root.append(overlay);
  queueMicrotask(() => input.focus());
}
