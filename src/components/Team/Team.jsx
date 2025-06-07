import React, { useState } from "react";

import Leadership from "./Leadership";
import Content from "./Content";
import Design from "./Design";
import Operations from "./Operations";
import External from "./External";
import Footer from "../Footer";

function Team() {
  const [selectedTeam, setSelectedTeam] = useState("leadership");

  const teams = [
    { id: "leadership", name: "Leadership" },
    { id: "content", name: "Content" },
    { id: "design", name: "Design" },
    { id: "external", name: "External" },
    { id: "operations", name: "Operations" },
  ];

  const renderTeamComponent = () => {
    switch (selectedTeam) {
      case "leadership":
        return <Leadership />;
      case "content":
        return <Content />;
      case "design":
        return <Design />;
      case "external":
        return <External />;
      case "operations":
        return <Operations />;
      default:
        return <Leadership />;
    }
  };

  return (
    <div className="Team">
      <div className="team-title">
        <h1>Meet Our Team</h1>
        <div className="pill-divider" />
      </div>
      
      <div className="team-selector">
        {teams.map((team) => (
          <button
            key={team.id}
            className={`team-button ${selectedTeam === team.id ? "active" : ""}`}
            onClick={() => setSelectedTeam(team.id)}
          >
            {team.name}
          </button>
        ))}
      </div>

      {renderTeamComponent()}
      <Footer />
    </div>
  );
}

Team.displayName = "Team";
export default Team;
