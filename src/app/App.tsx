import { useEffect, useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import GA from "../util/GoogleAnalytics";
import Header from "../components/common/Header";
import Footer from "../components/Footer";
import Home from "../features/home/Home";
import RegistrationPage from "../features/registration/RegistrationPage";
import Events from "../features/events/Events";
import EventPage from "../features/events/EventPage";
import Participation from "../features/participation/Participation";
import Team from "../features/team/Team";
import PageNotFound from "../components/PageNotFound";
import Ignite from "../features/ignite/Ignite";
import { EVENT_ROUTES } from "../content/events";
import { normalizePath } from "../content/pages";
import { focusHashTarget, focusPageHeading } from "./navigation";
import PageMetadata from "./PageMetadata";

export default function App() {
  const { pathname, search, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const initialNavigation = useRef(true);
  const analyticsPath = normalizePath(pathname);
  const redirecting = analyticsPath === "/our_team";

  useEffect(() => {
    if (!redirecting && GA.init()) GA.trackPageView(analyticsPath + search);
  }, [analyticsPath, search, redirecting]);

  useEffect(() => {
    if (redirecting) return;
    const initial = initialNavigation.current;
    initialNavigation.current = false;
    if (!initial && navigationType === "POP") return;
    if (hash) focusHashTarget(hash);
    else if (!initial) {
      // Route-based selectors can opt into retaining their own keyboard focus.
      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        active.dataset.preserveRouteFocus === "true" &&
        document.getElementById("main-content")?.contains(active)
      )
        return;
      window.scrollTo(0, 0);
      focusPageHeading();
    }
  }, [pathname, hash, key, navigationType, redirecting]);

  return (
    <div className="App">
      <PageMetadata />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/get-involved" element={<Participation />} />
          <Route path="/register" element={<RegistrationPage />} />
          {EVENT_ROUTES.map(({ route, year }) => (
            <Route
              key={route}
              path={route}
              element={<EventPage key={year} year={year} />}
            />
          ))}
          <Route
            path="/our_team"
            element={
              <Navigate
                replace
                to={{ pathname: "/our_team/leadership", search, hash }}
              />
            }
          />
          <Route path="/our_team/:section" element={<Team />} />
          <Route path="/ignite" element={<Ignite />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
