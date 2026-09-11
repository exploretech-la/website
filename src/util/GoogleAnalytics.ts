export interface AnalyticsEvent {
  category: string;
  action: string;
  label: string;
}
interface AnalyticsQueue {
  (...command: unknown[]): void;
  q?: unknown[][];
  l?: number;
}
declare global {
  interface Window {
    ga?: AnalyticsQueue;
    GoogleAnalyticsObject?: string;
  }
}
let initialized = false;
let enabled = false;

// Keep the shipped title-casing and email-redaction semantics when replacing react-ga.
// To Title Case 2.1, Copyright 2008-2013 David Gouch, MIT license.
const smallWords =
  /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
function formatLabel(value: string): string {
  const title = value
    .trim()
    .replace(
      /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,
      (word: string, index: number, text: string) => {
        if (
          index > 0 &&
          index + word.length !== text.length &&
          smallWords.test(word) &&
          text.charAt(index - 2) !== ":" &&
          (text.charAt(index + word.length) !== "-" ||
            text.charAt(index - 1) === "-") &&
          /[\s-]/.test(text.charAt(index - 1))
        )
          return word.toLowerCase();
        if (/[A-Z]|\../.test(word.slice(1))) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
    );
  return title.includes("@") ? "REDACTED (Potential Email Address)" : title;
}

// Queue immediately; request the vendor at idle, first interaction, or the deadline.
function scheduleVendorLoad() {
  const events = ["pointerdown", "keydown", "touchstart"];
  let requested = false;
  const load = () => {
    if (requested) return;
    requested = true;
    window.clearTimeout(deadline);
    window.removeEventListener("load", whenIdle);
    events.forEach((event) => window.removeEventListener(event, load, true));
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.google-analytics.com/analytics.js";
    document.head.appendChild(script);
  };
  const whenIdle = () => {
    if (window.requestIdleCallback)
      window.requestIdleCallback(load, { timeout: 1500 });
    else window.setTimeout(load, 1000);
  };
  const deadline = window.setTimeout(load, 4000);
  events.forEach((event) =>
    window.addEventListener(event, load, { capture: true, passive: true }),
  );
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
function init(): boolean {
  if (initialized) return enabled;
  initialized = true;
  const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID;
  enabled = import.meta.env.PROD === true && Boolean(trackingId?.trim());
  if (!enabled) return false;
  if (!window.ga) {
    const queue: AnalyticsQueue = (...command) => {
      (queue.q ??= []).push(command);
    };
    queue.l = Date.now();
    window.GoogleAnalyticsObject = "ga";
    window.ga = queue;
  }
  window.ga("create", trackingId, "auto");
  scheduleVendorLoad();
  return true;
}
function trackPageView(path: string) {
  if (!enabled) return;
  const page = path || window.location.pathname + window.location.search;
  window.ga?.("set", { page });
  window.ga?.("send", { hitType: "pageview", page });
}
function trackEvent({ category, action, label }: AnalyticsEvent) {
  if (!enabled) return;
  window.ga?.("send", {
    hitType: "event",
    eventCategory: formatLabel(category),
    eventAction: formatLabel(action),
    eventLabel: formatLabel(label),
  });
}
function trackOutbound(label: string, onSent: () => void) {
  if (!enabled) {
    onSent();
    return;
  }
  let sent = false;
  const done = () => {
    if (sent) return;
    sent = true;
    window.clearTimeout(deadline);
    onSent();
  };
  const deadline = window.setTimeout(done, 250);
  window.ga?.("send", {
    hitType: "event",
    eventCategory: "Outbound",
    eventAction: "Click",
    eventLabel: formatLabel(label),
    hitCallback: done,
  });
}
export default { init, trackPageView, trackEvent, trackOutbound };
