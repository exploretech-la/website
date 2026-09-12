import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import OutboundLink from "./OutboundLink";
import LogoWithIcons from "../static/svg/logo-with-icons-white.svg";
import { CONTACT_EMAIL } from "../content/participation";

export default function Footer() {
  return (
    <footer className="Footer on-dark">
      <div className="page-container footer-inner">
        <div className="footer-brand">
          <Link to="/" aria-label="exploretech.la home">
            <img src={LogoWithIcons} className="logo-with-icons" alt="" />
          </Link>
          <p>Technology outreach led by UCLA students.</p>
          <p className="footer-credit">
            Made with <FaHeart aria-label="love" role="img" /> in LA
          </p>
        </div>
        <nav aria-label="Footer programs">
          <h2>Programs</h2>
          <Link to="/events">Annual event and archives</Link>
          <Link to="/ignite">Ignite workshops</Link>
          <Link to="/our_team/leadership">Meet the team</Link>
        </nav>
        <nav aria-label="Footer participation">
          <h2>Get involved</h2>
          <Link to="/get-involved#schools">Schools and students</Link>
          <Link to="/get-involved#volunteer">UCLA volunteers</Link>
          <Link to="/get-involved#partners">Partners and sponsors</Link>
        </nav>
        <div className="footer-contact">
          <h2>Contact us</h2>
          <OutboundLink
            className="contact-address"
            href={`mailto:${CONTACT_EMAIL}`}
            eventLabel="Footer Email"
          >
            {CONTACT_EMAIL}
          </OutboundLink>
          <div className="social-media-list">
            <OutboundLink
              className="social-media-link"
              href="https://www.facebook.com/exploretech.la/"
              target="_blank"
              aria-label="exploretech.la on Facebook (opens in a new tab)"
              eventLabel="Facebook"
            >
              <FaFacebook size="1.5em" aria-hidden="true" focusable="false" />
            </OutboundLink>
            <OutboundLink
              className="social-media-link"
              href="https://www.instagram.com/exploretech.la/"
              target="_blank"
              aria-label="exploretech.la on Instagram (opens in a new tab)"
              eventLabel="Instagram"
            >
              <FaInstagram size="1.5em" aria-hidden="true" focusable="false" />
            </OutboundLink>
            <OutboundLink
              className="social-media-link"
              href="https://www.linkedin.com/company/exploretech-la/"
              target="_blank"
              aria-label="exploretech.la on LinkedIn (opens in a new tab)"
              eventLabel="LinkedIn"
            >
              <FaLinkedin size="1.5em" aria-hidden="true" focusable="false" />
            </OutboundLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
