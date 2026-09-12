import { Link } from "react-router-dom";
import DocumentLink from "../../components/DocumentLink";
import OutboundLink from "../../components/OutboundLink";
import { REGISTRATION_2021 } from "../../content/events/2021";
import { PROGRAMS } from "../../content/participation";
import Faq from "../events/Faq";
import Waivers from "../events/Waivers";
import TwoDaySchedule from "./TwoDaySchedule";

export default function RegistrationPage() {
  const content = REGISTRATION_2021;
  return (
    <div className="Register page-container">
      <header className="page-header">
        <Link className="text-link" to="/events">
          All events and archives
        </Link>
        <h1>{content.title}</h1>
        <p>April 10 and 11, 2021 · Online</p>
        <p className="status-notice">
          This page preserves the 2021 virtual event. It is not a registration
          page for an upcoming event. {PROGRAMS.annual.status}
        </p>
        <OutboundLink
          href={PROGRAMS.annual.inquiryHref}
          eventLabel="Annual event inquiry"
          className="action action-primary"
        >
          {PROGRAMS.annual.actionLabel}
        </OutboundLink>
        <nav className="section-links" aria-label="Archive sections">
          <a href="#documents">Program and documents</a>
          <a href="#schedule">Schedule</a>
        </nav>
      </header>
      <section
        id="documents"
        className="event-section"
        aria-labelledby="documents-heading"
      >
        <h2 id="documents-heading">2021 program and documents</h2>
        <p>
          Retained for historical reference. Instructions in these documents
          applied to the 2021 event only.
        </p>
        <ul className="document-list">
          {content.documents.map((document) => (
            <li key={document.name}>
              <DocumentLink document={document} />
            </li>
          ))}
        </ul>
      </section>
      <TwoDaySchedule days={content.schedule} />
      <Faq content={content.faq} />
      <Waivers forms={content.waivers} />
    </div>
  );
}
