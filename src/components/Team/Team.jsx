import React from 'react';

import Leadership from './Leadership';
import Content from './Content';
import Design from './Design';
import Operations from './Operations';
import External from './External';
import Footer from '../Footer';

function Team() {
  return (
    <div className="Team">
      <div className="team-title">
          <h1>Meet Our Team</h1>
          <div className="pill-divider" />
      </div>
      <Leadership />
      <Content />
      <Design />
      <External />
      <Operations />
      <Footer />
    </div>
  );
}

Team.displayName = 'Team';
export default Team;