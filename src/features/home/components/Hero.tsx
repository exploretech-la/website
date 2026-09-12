import { Link } from "react-router-dom";

import OutboundLink from "../../../components/OutboundLink";
import images from "../../../constants/optimizedImages";
import { PROGRAMS } from "../../../content/participation";
import LogoWithIconGroup from "../../../static/svg/logo-navy-with-icon-group-white.svg";
import GA from "../../../util/GoogleAnalytics";

export default function Hero() {
  return (
    <section className="Hero">
      <div className="hero-layout page-container">
        <div className="hero-content">
          <img
            src={LogoWithIconGroup}
            className="logo-with-icon-group"
            alt="exploretech.la"
          />
          <h1>Helping Los Angeles high school students explore technology</h1>
          <p>
            We are UCLA students bringing hands-on computer science and
            engineering experiences to high school students from underserved
            communities.
          </p>
          <p className="status-notice">{PROGRAMS.annual.status}</p>
          <div className="hero-cta section-links">
            <OutboundLink
              className="action action-primary"
              href={PROGRAMS.annual.inquiryHref}
              eventLabel={PROGRAMS.annual.actionLabel}
            >
              {PROGRAMS.annual.actionLabel}
            </OutboundLink>
            <Link
              className="text-link"
              to="/events"
              onClick={() =>
                GA.trackEvent({
                  category: "Hero",
                  action: "Click",
                  label: "Explore programs",
                })
              }
            >
              Explore our programs
            </Link>
          </div>
        </div>
        <img
          {...images["images/workshop-audience.jpg"]}
          className="hero-photo"
          alt="High school students taking part in an exploretech.la workshop"
          sizes="(min-width: 1200px) 480px, (min-width: 1100px) 42vw, (min-width: 640px) 640px, 100vw"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}
