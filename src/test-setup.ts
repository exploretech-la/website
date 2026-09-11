import { vi } from "vitest";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
// jsdom has no layout or media-query engine; browser smoke owns those contracts.
Element.prototype.scrollIntoView = vi.fn();
window.matchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
