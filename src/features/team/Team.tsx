import { Link, useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import People from "../../components/common/People";
import { teamCards, teamSections, teamSectionsById } from "../../content/teams";
import type { TeamSectionId } from "../../content/types";

interface SectionLayout {
  /** Second class on the <section>, after "Section". */
  readonly sectionClass: string;
  /** Wrapper div around header + cards; absent for the newest two sections. */
  readonly containerClass?: string;
  readonly headerClass: string;
  readonly elementId?: string;
}

/**
 * Legacy DOM shape per section. The five original sections wrap their header
 * and cards in a "<name>-container" div and use a "<name>-header"; Web Dev and
 * Marketing were added later without a container and share a generic header
 * class. Existing stylesheets select on these exact names.
 */
const sectionLayouts: Record<TeamSectionId, SectionLayout> = {
  leadership: {
    sectionClass: "Leadership",
    containerClass: "leadership-container",
    headerClass: "leadership-header",
    elementId: "leadership",
  },
  content: {
    sectionClass: "Content",
    containerClass: "content-container",
    headerClass: "content-header",
  },
  design: {
    sectionClass: "Design",
    containerClass: "design-container",
    headerClass: "design-header",
  },
  operations: {
    sectionClass: "Operations",
    containerClass: "operations-container",
    headerClass: "operations-header",
  },
  external: {
    sectionClass: "External",
    containerClass: "external-container",
    headerClass: "external-header",
  },
  "web-dev": {
    sectionClass: "WebDev",
    headerClass: "team-section-header",
  },
  marketing: {
    sectionClass: "Marketing",
    headerClass: "team-section-header",
  },
};

export default function Team() {
  const location = useLocation();

  // Section comes from the URL: /our_team and /our_team/<slug>.
  const pathParts = location.pathname.split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  const activeSlug =
    lastPart === "our_team" ? "leadership" : lastPart || "leadership";

  // Unknown slugs render Leadership without marking any tab active.
  const section =
    teamSections.find((candidate) => candidate.id === activeSlug) ??
    teamSectionsById.leadership;
  const layout = sectionLayouts[section.id];

  const sectionBody = (
    <>
      <div className={layout.headerClass}>
        <h3>{section.heading}</h3>
        <div className="pill-divider" />
      </div>
      <People people={teamCards(section.id)} />
    </>
  );

  return (
    <div className="Team">
      <div className="team-title">
        <h1>Meet Our Team</h1>
        <div className="pill-divider"></div>
      </div>

      <div className="team-navigation">
        {teamSections.map((candidate) => (
          <Link
            key={candidate.id}
            to={`/our_team/${candidate.id}`}
            className={candidate.id === activeSlug ? "active" : ""}
          >
            {candidate.navLabel}
          </Link>
        ))}
      </div>

      <div className="team-content">
        <section
          className={`Section ${layout.sectionClass}`}
          id={layout.elementId}
        >
          {layout.containerClass ? (
            <div className={layout.containerClass}>{sectionBody}</div>
          ) : (
            sectionBody
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
