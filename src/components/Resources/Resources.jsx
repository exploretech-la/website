import React from 'react';
import Button from 'react-bootstrap/Button';

import Workshops from './Workshops';
import FAQ from 'components/Resources/FAQ';
import Footer from '../Footer';
import Maps from 'components/Resources/Maps';
import Schedule from 'components/Resources/Schedule';
import Waivers from 'components/Resources/Waivers';

import busRoutes from "static/maps/bus_routes.jpg"
import ackerman_union_2F from "static/maps/su_map_ack_2.jpeg"
import ackerman_union_3F from "static/maps/su_map_ack_3.jpeg"
import wristbands from "static/maps/wristband_coordination.png"
import EventProgram from "static/pdf/Event_Program.pdf"

function Resources() {
  const maps = [
    {
      src: busRoutes,
      name: "Bus Routes",
    }, {
      src: ackerman_union_2F,
      name: "Ackerman Union 2F",
    }, {
      src: ackerman_union_3F,
      name: "Ackerman Union 3F",
    },
  ]

  return (
    <div className="Resources">
      <div className="resources-title">
          <h1>Resources</h1>
          <div className="pill-divider" />
          <div className="Section resources-text">
            <h5>
              Welcome students and teachers! Confused about the schedule? Lost and need a map? 
              Or maybe just curious about what workshops are happening and when? This webpage contains 
              important resources you need for the exploretech.la 2022 event! If you can't find what 
              you need, feel free to 
              contact <a href="mailto:exploretechla@cs.ucla.edu" target="_blank" rel="noopener noreferrer">exploretechla@cs.ucla.edu</a> for more questions.
            </h5>
          </div>
          <div className='Section event-program-button'>
            <Button size="lg" variant="info" href={EventProgram} target="_blank">
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
          <FAQ />
          <Waivers />
      </div>
      <Footer />
    </div>
  );
}

Resources.displayName = 'Resources';
export default Resources;