import { Link } from "react-router-dom";

import { AUDIENCES } from "../../../content/participation";
import HomePageSections from "../../../content/sections";

export default function GetInvolved() {
  return (
    <section
      className="GetInvolved page-container"
      id={HomePageSections.GET_INVOLVED.name}
      aria-labelledby="get-involved-title"
    >
      <h2 id="get-involved-title" className="section-heading">
        Get involved
      </h2>
      <div className="audience-grid">
        {Object.entries(AUDIENCES).map(([id, audience]) => (
          <Link className="audience-card" key={id} to={audience.path}>
            <h3>{audience.title}</h3>
            <p>{audience.description}</p>
            <span className="audience-card-action">
              {audience.actionLabel} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
