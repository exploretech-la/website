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
          <div className='Section event-program-button'>
            <Button size="lg" variant="outline-info" href={EventProgram} target="_blank">
              Click here to view the full event program
            </Button>
          </div>
          <Schedule />
          <Maps maps={maps} />
          <div className='Section resources-title'>
            <h2>Wristbands</h2>
            <div className="pill-divider" />
            <h5><b>Make sure you have your wristband on the entire time!</b></h5>
            <div className='resources-text'>
              <h5>
                All high school students are divided into 3 groups, each will get a different colored wristband. 
                During each session, 1 group will be at the exhibition hall and the other 2 groups will be at the workshops. 
                Group 1 (green colored-wristband)  will be at the exhibition hall during Session 1, 
                Group 2 (blue) during Session 2, and Group 3 (red) during Session 3.
              </h5>
            </div>
            <img style={{marginTop: '50px'}} src={wristbands} alt="Wristband coordination" />
          </div>
          <Workshops />
      </div>
      <Footer />
    </div>
  );
}

Resources.displayName = 'Resources';
export default Resources;