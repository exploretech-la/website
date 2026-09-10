const originalEnv = { ...process.env };
let GA;
let readyState;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  process.env.NODE_ENV = "production";
  process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID = "UA-000000-1";
  delete window.ga;
  document.head.innerHTML = "";
  readyState = jest
    .spyOn(document, "readyState", "get")
    .mockReturnValue("loading");
  GA = require("./GoogleAnalytics").default;
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  readyState.mockRestore();
  process.env = { ...originalEnv };
  delete window.ga;
  delete window.requestIdleCallback;
  document.head.innerHTML = "";
});

it("keeps early pageviews and events in order with their original route", () => {
  GA.init();
  GA.trackPageView("/our_team/leadership");
  GA.trackEvent({ category: "Team", action: "Click", label: "Profile" });
  GA.trackPageView("/ignite");

  expect(document.querySelectorAll("script")).toHaveLength(0);
  const commands = window.ga.q.map((args) => Array.from(args));
  const routeCommands = commands.filter(
    ([command]) => command === "set" || command === "send"
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
  jest.runAllTimers();
  expect(
    document.querySelectorAll(
      'script[src="https://www.google-analytics.com/analytics.js"]'
    )
  ).toHaveLength(1);
  expect(window.ga.q.filter((args) => args[0] === "create")).toHaveLength(1);
});

it("eventually requests analytics even when load and interaction never happen", () => {
  GA.init();
  jest.runAllTimers();
  expect(
    document.querySelector(
      'script[src="https://www.google-analytics.com/analytics.js"]'
    )
  ).not.toBeNull();
});

it.each(["development", "missing ID"])(
  "does not request analytics for %s",
  (mode) => {
    if (mode === "development") process.env.NODE_ENV = "development";
    else delete process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
    expect(GA.init()).toBe(false);
    GA.trackPageView("/");
    GA.trackEvent({ category: "Test", action: "Click", label: "Disabled" });
    jest.runAllTimers();
    expect(window.ga).toBeUndefined();
    expect(document.querySelectorAll("script")).toHaveLength(0);
  }
);
