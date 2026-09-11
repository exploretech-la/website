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
import Home from "../features/home/Home";
import RegistrationPage from "../features/registration/RegistrationPage";
import EventPage from "../features/events/EventPage";
import Team from "../features/team/Team";
import PageNotFound from "../components/PageNotFound";
import Ignite from "../features/ignite/Ignite";

import { EVENT_ROUTES } from "../content/events";
export default function App() {
  const { pathname, search, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const initialNavigation = useRef(true);
  const redirecting = /^\/our_team\/?$/i.test(pathname);

  useEffect(() => {
    // Alias routes never represent a displayed page. Track only their destination.
    if (!redirecting && GA.init()) GA.trackPageView(pathname + search);
  }, [pathname, search, redirecting]);

  useEffect(() => {
    const initial = initialNavigation.current;
    initialNavigation.current = false;
    if (!initial && navigationType === "POP") return;
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash, key, navigationType]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        {EVENT_ROUTES.map(({ route, year }) => (
          <Route key={route} path={route} element={<EventPage year={year} />} />
        ))}
        <Route
          path="/our_team"
          element={<Navigate replace to="/our_team/leadership" />}
        />
        <Route path="/our_team/:section" element={<Team />} />
        <Route path="/ignite" element={<Ignite />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
