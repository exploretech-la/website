import React from 'react';

import Footer from '../Footer';

function Resources() {
  return (
    <div className="Resources">
      <div className="resources-title">
          <h1>Resources</h1>
          <div className="pill-divider" />
          <div className="resources-text">
            <h5>Come back after our event to access resources and recordings of all workshops and panels!</h5>
          </div>
      </div>
      <Footer />
    </div>
  );
}

Resources.displayName = 'Resources';
export default Resources;