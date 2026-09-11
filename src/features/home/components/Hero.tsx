import { Link } from "react-router-dom";

import GA from "../../../util/GoogleAnalytics";
import HomePageSections from "../../../content/sections";
import LogoWithIconGroup from "../../../static/svg/logo-navy-with-icon-group-white.svg";
import ActionLink from "../../../components/ActionLink";

const trackLearnMore = () =>
  GA.trackEvent({ category: "Hero", action: "Click", label: "Learn More" });

export default function Hero() {
  return (
    <section className="Section Hero">
      <img
        src={LogoWithIconGroup}
        className="logo-with-icon-group"
        alt="logo-with-icon-group"
      />
      <div className="hero-content">
        <h2 className="h1-title">Schedule is out now!</h2>
        <h5 className="h1-title">
          Check out our 2026 schedule page for the latest event details and
          updates.
        </h5>
        <p className="h1-title">
          <b>Any questions or partnerships?</b>
        </p>
        <p>
          Contact our executive directors Spoorthy Nalumachu and Clara Zhang:{" "}
          <a
            href="mailto:exploretechla@cs.ucla.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            exploretechla@cs.ucla.edu
          </a>{" "}
        </p>

        <div className="hero-cta">
          <Link
            className="action action-info"
            to="/resources2026"
            onClick={() =>
              GA.trackEvent({
                category: "Hero",
                action: "Click",
                label: "Register Today",
              })
            }
          >
            Event Info
          </Link>
          <ActionLink
            className="action action-info"
            href={`#${HomePageSections.ABOUT.name}`}
            onClick={trackLearnMore}
            onKeyDown={(event) => {
              if (event.key !== " ") return;
              trackLearnMore();
            }}
          >
            Learn More
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
