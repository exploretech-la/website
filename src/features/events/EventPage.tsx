import { Link } from "react-router-dom";
import DocumentLink from "../../components/DocumentLink";
import OutboundLink from "../../components/OutboundLink";
import { EVENTS } from "../../content/events";
import type { EventYear } from "../../content/events/types";
import { CONTACT_EMAIL, PROGRAMS } from "../../content/participation";
import Faq from "./Faq";
import Maps from "./Maps";
import Schedule from "./Schedule";
import Waivers from "./Waivers";
import Workshops from "./Workshops";

export default function EventPage({ year }: { year: EventYear }) {
  const event = EVENTS[year];

  return (
    <div className="Resources page-container">
      <header className="page-header">
        <Link className="text-link" to="/events">
          All events and archives
        </Link>
        <h1>exploretech.la {event.year} archive</h1>
        <p className="status-notice">
          This is the {event.year} event archive, not a current event schedule
          or registration page. {PROGRAMS.annual.status}
        </p>
        <nav className="section-links" aria-label="Event sections">
          <Link to="#schedule">Schedule</Link>
          <Link to="#workshops">Workshops</Link>
          <Link to="#maps">Maps</Link>
          <Link to="#help">Help</Link>
        </nav>
        <DocumentLink
          document={event.program}
          className="action action-outline"
        />
      </header>
      <div className="event-logistics">
        <Schedule items={event.schedule} />
        <Maps maps={event.maps} />
      </div>
      <section
        id="help"
        className="event-section"
        aria-labelledby="event-help-heading"
      >
        <h2 id="event-help-heading">Help and next events</h2>
        <p>
          Questions about these resources? Email{" "}
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <OutboundLink
          href={PROGRAMS.annual.inquiryHref}
          eventLabel="Annual event inquiry"
          className="action action-primary"
        >
          {PROGRAMS.annual.actionLabel}
        </OutboundLink>
      </section>
      <Workshops sections={event.workshops} />
      <section className="event-section" aria-labelledby="wristbands-heading">
        <h2 id="wristbands-heading">Wristband groups</h2>
        <p>
          At the {event.year} event, students were divided into three groups.
          Group 1 wore green wristbands and visited the exhibition hall during
          Session 1, Group 2 wore blue during Session 2, and Group 3 wore red
          during Session 3. The other groups attended workshops.
        </p>
        {event.wristbandImage && (
          <div>
            <img
              className="wristband-image"
              src={event.wristbandImage.src}
              alt={event.wristbandImage.alt}
              loading="lazy"
            />
            <DocumentLink document={event.wristbandImage} />
          </div>
        )}
      </section>
      {event.faq && <Faq content={event.faq} />}
      {event.waivers && <Waivers forms={event.waivers} />}
    </div>
  );
}
