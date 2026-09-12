import { Link } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import { EVENT_ROUTES } from "../../content/events";
import { PROGRAMS } from "../../content/participation";

export default function Events() {
  return (
    <div className="Events page-container">
      <header className="page-header">
        <h1>Events</h1>
        <p>
          Explore technology with UCLA students through our annual event and
          Ignite workshops.
        </p>
      </header>
      <div className="program-grid">
        <section aria-labelledby="annual-event-heading">
          <h2 id="annual-event-heading">{PROGRAMS.annual.title}</h2>
          <p>{PROGRAMS.annual.description}</p>
          <p className="status-notice">{PROGRAMS.annual.status}</p>
          <OutboundLink
            href={PROGRAMS.annual.inquiryHref}
            eventLabel="Annual event inquiry"
            className="action action-primary"
          >
            {PROGRAMS.annual.actionLabel}
          </OutboundLink>
          <p>
            <Link className="text-link" to={PROGRAMS.annual.archivePath}>
              Browse the 2026 event archive
            </Link>
          </p>
        </section>
        <section aria-labelledby="ignite-program-heading">
          <h2 id="ignite-program-heading">{PROGRAMS.ignite.title}</h2>
          <p>{PROGRAMS.ignite.description}</p>
          <p className="status-notice">{PROGRAMS.ignite.status}</p>
          <OutboundLink
            href={PROGRAMS.ignite.inquiryHref}
            eventLabel="Ignite inquiry"
            className="action action-outline"
          >
            {PROGRAMS.ignite.actionLabel}
          </OutboundLink>
          <p>
            <Link className="text-link" to="/ignite">
              About Ignite and past workshops
            </Link>
          </p>
        </section>
      </div>
      <section
        className="event-section"
        aria-labelledby="event-archives-heading"
      >
        <h2 id="event-archives-heading">Past event archives</h2>
        <p>
          Historical schedules, workshop resources, recordings, and maps. These
          pages are not current registration instructions.
        </p>
        <ul className="archive-links">
          {EVENT_ROUTES.map(({ route, year }) => (
            <li key={year}>
              <Link className="text-link" to={route}>
                {year} event archive
              </Link>
            </li>
          ))}
          <li>
            <Link className="text-link" to="/register">
              2021 virtual event archive
            </Link>
          </li>
        </ul>
        <Link className="action action-outline" to="/get-involved">
          Find your way to get involved
        </Link>
      </section>
    </div>
  );
}
