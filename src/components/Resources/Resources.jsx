import React from 'react';

import Ceremonies from './Ceremonies';
import Workshops from './Workshops';
import FAQ from 'components/Resources/FAQ';
import Footer from '../Footer';
import Maps from 'components/Resources/Maps';
import Schedule from 'components/Resources/Schedule';
import Waivers from 'components/Resources/Waivers';

import busRoutes from "static/maps/bus_routes.jpg"
import ackerman_union_2F from "static/maps/su_map_ack_2.jpeg"
import ackerman_union_3F from "static/maps/su_map_ack_3.jpeg"

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
              you need, feel free to contact exploretechla@cs.ucla.edu for more questions.
            </h5>
          </div>
          <Schedule />
          <Maps maps={maps} />
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