import React, { useState } from "react";

import Leadership from "./Leadership";
import Content from "./Content";
import Design from "./Design";
import Operations from "./Operations";
import External from "./External";
import Footer from "../Footer";
import "./Team.scss";

function Team() {
  const [activeSection, setActiveSection] = useState("leadership");

  const renderTeamSection = () => {
    return <div className="team-section">{/* Content removed */}</div>;
  };

  return (
    <div className="Team">
      <div className="team-title">
        <h1>Meet Our Team</h1>
        <div className="pill-divider"></div>
      </div>

      <div className="team-navigation">
        <button
          className={activeSection === "leadership" ? "active" : ""}
          onClick={() => setActiveSection("leadership")}
        >
          Leadership
        </button>
        <button
          className={activeSection === "content" ? "active" : ""}
          onClick={() => setActiveSection("content")}
        >
          Content
        </button>
        <button
          className={activeSection === "design" ? "active" : ""}
          onClick={() => setActiveSection("design")}
        >
          Design
        </button>
        <button
          className={activeSection === "operations" ? "active" : ""}
          onClick={() => setActiveSection("operations")}
        >
          Operations
        </button>
        <button
          className={activeSection === "external" ? "active" : ""}
          onClick={() => setActiveSection("external")}
        >
          External
        </button>
      </div>

      <div className="team-content">
        <div className="coming-soon-overlay">
          <h2>Coming Soon...</h2>
        </div>
        {renderTeamSection()}
      </div>

      <Footer />
    </div>
  );
}

Team.displayName = "Team";

export default Team;
