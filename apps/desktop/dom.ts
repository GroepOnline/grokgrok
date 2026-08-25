// Minimal DOM helpers shared by surfaces (no framework — stdlib platform only).
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, textContent?: string): HTMLElement {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (textContent !== undefined) n.textContent = textContent;
  return n;
}
