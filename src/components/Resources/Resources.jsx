import React from 'react';

import Ceremonies from './Ceremonies';
import Workshops from './Workshops';
import Footer from '../Footer';

function Resources() {
  return (
    <div className="Resources">
      <div className="resources-title">
          <h1>Resources</h1>
          <div className="pill-divider" />
          <div className="Section resources-text">
            <h5>
              Welcome students! This webpage contains the recordings and resources of all of our 
              workshops and panels for the exploretech.la 2021 event! For each workshop or panel, 
              please watch the recording first and check back on this page to access the appropriate 
              resources for the activity.
            </h5>
          </div>
          <Ceremonies />
          <Workshops />
      </div>
      <Footer />
    </div>
  );
}

Resources.displayName = 'Resources';
export default Resources;