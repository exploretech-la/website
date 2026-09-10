import ReactGA from "react-ga";

let initialized = false;
let enabled = false;

// Queue hits immediately; let analytics.js and its connected tag load after
// rendering, on interaction, or within four seconds on a slow connection.
const scheduleVendorLoad = () => {
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
    if (window.requestIdleCallback) {
      window.requestIdleCallback(load, { timeout: 1500 });
    } else {
      window.setTimeout(load, 1000);
    }
  };
  const deadline = window.setTimeout(load, 4000);
  events.forEach((event) =>
    window.addEventListener(event, load, { capture: true, passive: true })
  );
  if (document.readyState === "complete") {
    whenIdle();
  } else {
    window.addEventListener("load", whenIdle, { once: true });
  }
};

const init = () => {
  if (initialized) return enabled;
  initialized = true;
  const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
  enabled =
    process.env.NODE_ENV === "production" &&
    Boolean(trackingId && trackingId.trim());
  if (!enabled) return false;

  if (!window.ga) {
    const queue = function () {
      (queue.q = queue.q || []).push(arguments);
    };
    queue.l = Date.now();
    window.GoogleAnalyticsObject = "ga";
    window.ga = queue;
  }
  // Preserve the existing tracker and events without react-ga injecting a script.
  ReactGA.initialize(trackingId, { standardImplementation: true });
  scheduleVendorLoad();
  return true;
};

const trackPageView = (path) => {
  if (!enabled) return;
  const page = path || window.location.pathname + window.location.search;
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const trackEvent = ({ category, action, label }) => {
  if (!enabled) return;
  ReactGA.event({ category, action, label });
};

export default { init, trackPageView, trackEvent };
