export function focusHashTarget(hash: string): boolean {
  let id = hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    return false;
  }
  const target = document.getElementById(id);
  if (!target) return false;
  if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView();
  return true;
}

export function focusPageHeading() {
  const target =
    document.querySelector<HTMLElement>("#main-content h1") ??
    document.getElementById("main-content");
  if (!target) return;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}
