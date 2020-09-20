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

export default {
    init,
    trackPageView,
};
