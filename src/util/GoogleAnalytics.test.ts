import { vi, type MockInstance } from "vitest";
import type Analytics from "./GoogleAnalytics";

let GA: typeof Analytics;
let readyState: MockInstance<() => DocumentReadyState>;

function queuedCommands() {
  const queue = window.ga?.q;
  if (!queue) throw new Error("Analytics did not initialize its command queue");
  return queue;
}
beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.stubEnv("PROD", true);
  vi.stubEnv("VITE_GOOGLE_ANALYTICS_TRACKING_ID", "UA-000000-1");
  delete window.ga;
  document.head.innerHTML = "";
  readyState = vi
    .spyOn(document, "readyState", "get")
    .mockReturnValue("loading");
  GA = (await import("./GoogleAnalytics")).default;
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  readyState.mockRestore();
  vi.unstubAllEnvs();
  delete window.ga;
  document.head.innerHTML = "";
});

it("keeps early pageviews and events in order with their original route", () => {
  GA.init();
  GA.trackPageView("/our_team/leadership");
  GA.trackEvent({ category: "Team", action: "Click", label: "Profile" });
  GA.trackPageView("/ignite");

  expect(document.querySelectorAll("script")).toHaveLength(0);
  const commands = queuedCommands();
  const routeCommands = commands.filter(
    ([command]) => command === "set" || command === "send",
  );
  expect(routeCommands).toEqual([
    ["set", { page: "/our_team/leadership" }],
    ["send", { hitType: "pageview", page: "/our_team/leadership" }],
    [
      "send",
      {
        hitType: "event",
        eventCategory: "Team",
        eventAction: "Click",
        eventLabel: "Profile",
      },
    ],
    ["set", { page: "/ignite" }],
    ["send", { hitType: "pageview", page: "/ignite" }],
  ]);
});

it("loads the vendor once when interaction beats idle and the deadline", () => {
  GA.init();
  GA.init();
  window.dispatchEvent(new Event("pointerdown"));
  window.dispatchEvent(new Event("keydown"));
  window.dispatchEvent(new Event("load"));
  vi.runAllTimers();
  expect(
    document.querySelectorAll(
      'script[src="https://www.google-analytics.com/analytics.js"]',
    ),
  ).toHaveLength(1);
  expect(queuedCommands().filter((args) => args[0] === "create")).toHaveLength(
    1,
  );
});

it("eventually requests analytics even when load and interaction never happen", () => {
  GA.init();
  vi.runAllTimers();
  expect(
    document.querySelector(
      'script[src="https://www.google-analytics.com/analytics.js"]',
    ),
  ).not.toBeNull();
});

it.each(["development", "missing ID"])(
  "does not request analytics for %s",
  (mode) => {
    if (mode === "development") vi.stubEnv("PROD", false);
    else vi.stubEnv("VITE_GOOGLE_ANALYTICS_TRACKING_ID", undefined);
    expect(GA.init()).toBe(false);
    GA.trackPageView("/");
    GA.trackEvent({ category: "Test", action: "Click", label: "Disabled" });
    vi.runAllTimers();
    expect(window.ga).toBeUndefined();
    expect(document.querySelectorAll("script")).toHaveLength(0);
  },
);

it("preserves title casing while redacting email labels", () => {
  GA.init();
  GA.trackEvent({
    category: "Outbound",
    action: "Click",
    label: "founding_story",
  });
  GA.trackEvent({
    category: "Outbound",
    action: "Click",
    label: "person@example.com",
  });
  const hits = queuedCommands()
    .filter(([command]) => command === "send")
    .map(([, hit]) => hit);
  expect(hits).toEqual([
    {
      hitType: "event",
      eventCategory: "Outbound",
      eventAction: "Click",
      eventLabel: "Founding_story",
    },
    {
      hitType: "event",
      eventCategory: "Outbound",
      eventAction: "Click",
      eventLabel: "REDACTED (Potential Email Address)",
    },
  ]);
});

it("continues outbound navigation exactly once when a late vendor callback follows the timeout", () => {
  GA.init();
  const navigate = vi.fn();
  GA.trackOutbound("Profile", navigate);
  const hit = queuedCommands().find(([command]) => command === "send")?.[1];
  if (
    !hit ||
    typeof hit !== "object" ||
    !("hitCallback" in hit) ||
    typeof hit.hitCallback !== "function"
  ) {
    throw new Error("Outbound event is missing its completion callback");
  }
  vi.advanceTimersByTime(250);
  hit.hitCallback();
  expect(navigate).toHaveBeenCalledTimes(1);
});
