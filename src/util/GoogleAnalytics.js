import ReactGA from 'react-ga';

// WARNING: DO NOT COMMIT TRACKING ID
const trackingId = null;

const init = () => {
    const isGAEnabled = (process.env.NODE_ENV === 'production') && (trackingId !== null);

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
