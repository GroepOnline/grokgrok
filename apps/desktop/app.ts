// Clean-room reconstruction shell entry. Boots a deterministic scenario
// (?scenario=<id>, harness affordance — the shipped app has no URL router,
// see docs/ui/renderer-atlas.md) and owns the render loop.
import { bootScenario, SCENARIOS } from "./fixtures.js";
import { setRenderer, state, el, requestRender } from "./state.js";
import { renderChat, renderSidebar } from "./views-core.js";
import {
  renderBotDetails, renderComputer, renderCreateBot, renderHiddenChats,
  renderOrgChart, renderPalette, renderPlugins, renderRoutines, renderSettings,
} from "./views-surfaces.js";

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;
  document.documentElement.dataset["theme"] = state.theme;
  app.replaceChildren();

  renderSidebar(app);
  const page = state.pageStack[state.pageStack.length - 1]!;
  const content = el("div", "page-host");
  switch (page.name) {
    case "chat": renderChat(content, page.botId); break;
    case "create-bot": renderCreateBot(content); break;
    case "bot-details": renderBotDetails(content, page.botId); break;
    case "routines": renderRoutines(content, page.botId, page.routineId); break;
    case "computer": renderComputer(content, page.botId); break;
    case "plugins": renderPlugins(content); break;
    case "settings": renderSettings(content, page.tab); break;
    case "hidden-chats": renderHiddenChats(content); break;
    case "org-chart": renderOrgChart(content); break;
  }
  app.append(content);
  renderPalette(app);
}

setRenderer(render);

function boot(): void {
  const params = new URLSearchParams(location.search);
  let scenario = params.get("scenario") ?? "default";
  if (!(SCENARIOS as readonly string[]).includes(scenario)) scenario = "default";
  bootScenario(state, scenario);
  render();
}

// global keys: Cmd/Ctrl+K palette (command palette surface), Esc back/close
window.addEventListener("keydown", (ev) => {
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k") {
    ev.preventDefault();
    state.paletteOpen = !state.paletteOpen;
    requestRender();
  } else if (ev.key === "Escape") {
    if (state.paletteOpen) {
      state.paletteOpen = false;
      requestRender();
    }
  }
});

boot();
