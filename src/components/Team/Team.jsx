import React from "react";
import { useLocation, Link } from "react-router-dom";

import Leadership from "./Leadership";
import Content from "./Content";
import Design from "./Design";
import Operations from "./Operations";
import External from "./External";
import Footer from "../Footer";
import People from "../common/People";
import { WebDev } from "constants/webdev";
import { Marketing } from "constants/marketing";
import "./Team.scss";

function Team() {
  const location = useLocation();
  
  // Extract section from URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeSection = pathParts[pathParts.length - 1] === 'our_team' 
    ? 'leadership' 
    : pathParts[pathParts.length - 1] || 'leadership';

  const renderTeamSection = () => {
    switch (activeSection) {
      case "leadership":
        return <Leadership />;
      case "content":
        return <Content />;
      case "design":
        return <Design />;
      case "operations":
        return <Operations />;
      case "external":
        return <External />;
      case "web-dev":
        return (
          <section className="Section WebDev">
            <div className="team-section-header">
              <h3>Web Dev</h3>
              <div className="pill-divider" />
            </div>
            <People people={WebDev} />
          </section>
        );
      case "marketing":
        return (
          <section className="Section Marketing">
            <div className="team-section-header">
              <h3>Marketing</h3>
              <div className="pill-divider" />
            </div>
            <People people={Marketing} />
          </section>
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
        <Link
          to="/our_team/leadership"
          className={activeSection === "leadership" ? "active" : ""}
        >
          Leadership
        </Link>
        <Link
          to="/our_team/content"
          className={activeSection === "content" ? "active" : ""}
        >
          Content
        </Link>
        <Link
          to="/our_team/design"
          className={activeSection === "design" ? "active" : ""}
        >
          Design
        </Link>
        <Link
          to="/our_team/operations"
          className={activeSection === "operations" ? "active" : ""}
        >
          Operations
        </Link>
        <Link
          to="/our_team/external"
          className={activeSection === "external" ? "active" : ""}
        >
          External
        </Link>
        <Link
          to="/our_team/web-dev"
          className={activeSection === "web-dev" ? "active" : ""}
        >
          Web Dev
        </Link>
        <Link
          to="/our_team/marketing"
          className={activeSection === "marketing" ? "active" : ""}
        >
          Marketing
        </Link>
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
