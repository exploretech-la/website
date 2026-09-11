import { MdKeyboardArrowRight } from "react-icons/md";

import OutboundLink from "../../../components/OutboundLink";
import HomePageSections from "../../../content/sections";
import {
  LargeLogoSponsors,
  SmallLogoSponsors,
  type SponsorLogo,
} from "../content/sponsors";

// Sponsor logos live at the bottom of the home page, so they are all lazy; the
// two rows are rendered at different widths.
const LargeLogoSizes = "(min-width: 768px) 16rem, 14rem";
const SmallLogoSizes = "(min-width: 768px) 12rem, 8rem";

function renderLogo({ name, website, ...image }: SponsorLogo, sizes: string) {
  return (
    <div className="logo-container" key={name}>
      <OutboundLink href={website} target="_blank" eventLabel={name}>
        <img
          {...image}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className="logo"
          alt={name}
        />
      </OutboundLink>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section className="Section Sponsors" id={HomePageSections.SPONSORS.name}>
      <div className="sponsors-container">
        <div className="sponsors-header">
          <h3>Our Sponsors</h3>
          <div className="pill-divider" />
        </div>
        <div className="large-logos">
          {LargeLogoSponsors.map((logo) => renderLogo(logo, LargeLogoSizes))}
        </div>
        <div className="small-logos">
          {SmallLogoSponsors.map((logo) => renderLogo(logo, SmallLogoSizes))}
        </div>
        <div className="sponsor-contact">
          <h5>Interested in sponsoring?</h5>
          <div className="sponsor-cta">
            <OutboundLink
              href="mailto:exploretechla@cs.ucla.edu"
              target="_blank"
              eventLabel="email_us_sponsors"
            >
              <p>Email Us!</p>
              <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
            </OutboundLink>
          </div>
        </div>
      </div>
    </section>
  );
}
