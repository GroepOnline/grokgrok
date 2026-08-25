// Clean-room reconstruction shell for Grok Bot 0.24 surfaces.
// Data shapes mirror artifact-proven contracts (src/wire/*.generated.ts, claims/ledger.json).
// Scenario registry = deterministic screen fixtures keyed by canonical surface ids.
// Build: npm run build:desktop   Serve: apps/desktop/dist
import { SCENARIOS, renderSidebar } from "./surfaces.js";

const app = document.getElementById("app")!;

let active: string | undefined;
function show(id?: string) {
  active = id;
  const main = document.querySelector<HTMLElement>(".main")!;
  main.querySelectorAll(".transcript,.surface").forEach((n) => n.remove());
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]!;
  const before = main.children.length;
  scenario.render(main);
  // stamp canonical scenario id on the rendered section for deterministic tests
  if (main.children.length > before) {
    (main.children[before] as HTMLElement).dataset.scenario = scenario.id;
  }
  (document.getElementById("scenario-select") as HTMLSelectElement).value = scenario.id;
}

renderSidebar(app);
const main = document.createElement("main");
main.className = "main";
app.append(main);

const bar = document.createElement("footer");
bar.className = "composer";
bar.id = "scenario-bar";
const select = document.createElement("select");
select.id = "scenario-select";
for (const s of SCENARIOS) {
  const o = document.createElement("option");
  o.value = s.id;
  o.textContent = s.title;
  select.append(o);
}
select.addEventListener("change", () => show(select.value));
bar.append(select);
main.append(bar);

show();

// test hook — deterministic scenario switching
(window as unknown as { __grokgrok: unknown }).__grokgrok = {
  setScenario: show,
  scenarios: SCENARIOS.map((s) => ({ id: s.id, evidence: s.evidence })),
};
