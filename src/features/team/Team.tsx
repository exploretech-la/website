import { Link, useLocation, useNavigate } from "react-router-dom";

import People from "../../components/common/People";
import { teamCards, teamSections, teamSectionsById } from "../../content/teams";
import { normalizePath } from "../../content/pages";

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = normalizePath(location.pathname).split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  const activeSlug =
    lastPart === "our_team" ? "leadership" : lastPart || "leadership";
  const selectedSection = teamSections.find(
    (candidate) => candidate.id === activeSlug,
  );
  // Unknown slugs still show Leadership without selecting a department link.
  const section = selectedSection ?? teamSectionsById.leadership;

  return (
    <div className="Team page-container">
      <header className="page-header team-title">
        <h1>Meet our team</h1>
        <p>The UCLA students behind exploretech.la.</p>
      </header>
      <div className="team-department-picker">
        <label htmlFor="team-department">Department</label>
        <select
          id="team-department"
          data-preserve-route-focus="true"
          value={selectedSection?.id ?? ""}
          onChange={(event) => navigate(`/our_team/${event.target.value}`)}
        >
          {!selectedSection && (
            <option value="" disabled>
              Choose a department
            </option>
          )}
          {teamSections.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.navLabel}
            </option>
          ))}
        </select>
      </div>
      <nav className="team-navigation" aria-label="Team departments">
        {teamSections.map((candidate) => (
          <Link
            key={candidate.id}
            to={`/our_team/${candidate.id}`}
            aria-current={candidate.id === activeSlug ? "page" : undefined}
            className={candidate.id === activeSlug ? "active" : undefined}
          >
            {candidate.navLabel}
          </Link>
        ))}
      </nav>
      <section
        className="team-content"
        aria-labelledby="team-section-title"
        id={section.id}
      >
        <h2 id="team-section-title" className="section-heading">
          {section.heading}
        </h2>
        <People people={teamCards(section.id)} />
      </section>
    </div>
  );
}
