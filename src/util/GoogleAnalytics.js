import ReactGA from 'react-ga';

/**
 * Initializes Google Analytics if we are in the production environmentand have a non-null tracking ID
 *
 * WARNING: DO NOT COMMIT THE ACTUAL TRACKING ID
 */
const init = () => {
  const isProd = (process.env.NODE_ENV === 'production');
  const trackingId = isProd ? process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID : null;
  const isGAEnabled = isProd && (trackingId !== null);

  if (isGAEnabled) {
    ReactGA.initialize(trackingId);
  }

  return isGAEnabled;
}

const trackPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const trackEvent = ({ category, action, label }) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export default {
  init,
  trackPageView,
  trackEvent,
};
