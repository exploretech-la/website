import { FaFacebook, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";

import OutboundLink from "./OutboundLink";
import LogoWithIcons from "../static/svg/logo-with-icons-white.svg";

const facebookLink = "https://www.facebook.com/exploretech.la/";
const instagramLink = "https://www.instagram.com/exploretech.la/";
const linkedinLink = "https://www.linkedin.com/company/exploretech-la/";

export default function Footer() {
  return (
    <section className="Section Footer">
      <div className="footer-inner">
        <div className="footer-item logo">
          <img
            src={LogoWithIcons}
            className="logo-with-icons"
            alt="logo-with-icons"
          />
        </div>
        <div className="footer-item social-media">
          <p>FIND US ON</p>
          <div className="social-media-list">
            <OutboundLink
              className="social-media-link"
              href={facebookLink}
              target="_blank"
              eventLabel="facebook"
            >
              <FaFacebook size="2em" />
            </OutboundLink>
            <OutboundLink
              className="social-media-link"
              href={instagramLink}
              target="_blank"
              eventLabel="instagram"
            >
              <FaInstagram size="2em" />
            </OutboundLink>
            <OutboundLink
              className="social-media-link"
              href={linkedinLink}
              target="_blank"
              eventLabel="linkedin"
            >
              <FaLinkedin size="2em" />
            </OutboundLink>
          </div>
        </div>
        <div className="footer-item email">
          <p>REACH US AT</p>
          <p>
            <OutboundLink
              href="mailto:exploretechla@cs.ucla.edu"
              target="_blank"
              eventLabel="email_us_footer"
            >
              exploretechla@cs.ucla.edu
            </OutboundLink>
          </p>
        </div>
        <div className="footer-item">
          <p>
            Made with <FaHeart className="FaHeart" /> in LA
          </p>
        </div>
      </div>
    </section>
  );
}
