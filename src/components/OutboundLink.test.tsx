import { act } from "react";
import { createRoot } from "react-dom/client";
import { vi } from "vitest";
import OutboundLink from "./OutboundLink";
import GA from "../util/GoogleAnalytics";

vi.mock("../util/GoogleAnalytics", () => ({
  default: { trackOutbound: vi.fn() },
}));

it("leaves Alt-click to the browser while recording the outbound action", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let prevented: boolean | undefined;
  const observe = (event: Event) => {
    prevented = event.defaultPrevented;
    // Observe React's decision, then prevent jsdom from attempting navigation.
    event.preventDefault();
  };
  document.addEventListener("click", observe, { once: true });
  try {
    act(() =>
      root.render(
        <OutboundLink
          href="https://example.com/document.pdf"
          eventLabel="Document"
        >
          Read document
        </OutboundLink>,
      ),
    );
    const anchor = container.querySelector("a");
    if (!anchor) throw new Error("Outbound link did not render");
    act(() =>
      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          altKey: true,
        }),
      ),
    );
    expect(prevented).toBe(false);
    expect(GA.trackOutbound).toHaveBeenCalledWith(
      "Document",
      expect.any(Function),
    );
  } finally {
    document.removeEventListener("click", observe);
    act(() => root.unmount());
    container.remove();
    vi.clearAllMocks();
  }
});
