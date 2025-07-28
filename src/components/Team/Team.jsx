import React, { useState } from "react";

import Leadership from "./Leadership";
// import _Content from "./Content";
// import _Design from "./Design";
// import _Operations from "./Operations";
// import _External from "./External";
import Footer from "../Footer";
import "./Team.scss";

function Team() {
  const [activeSection, setActiveSection] = useState("leadership");

  const renderTeamSection = () => {
    switch (activeSection) {
      case "leadership":
        return <Leadership />;
      case "content":
        return (
          <div className="coming-soon-section">
            <h2>Coming Soon!</h2>
            <p>Content team information will be available soon.</p>
          </div>
        );
      case "design":
        return (
          <div className="coming-soon-section">
            <h2>Coming Soon!</h2>
            <p>Design team information will be available soon.</p>
          </div>
        );
      case "operations":
        return (
          <div className="coming-soon-section">
            <h2>Coming Soon!</h2>
            <p>Operations team information will be available soon.</p>
          </div>
        );
      case "external":
        return (
          <div className="coming-soon-section">
            <h2>Coming Soon!</h2>
            <p>External team information will be available soon.</p>
          </div>
        );
      default:
        return <Leadership />;
    }
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
        {renderTeamSection()}
      </div>

      <Footer />
    </div>
  );
}

Team.displayName = "Team";

export default Team;
