import React from "react";

import Hero from './Hero';
import Alerts from './common/Alerts'
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';
import RegistrationAlert from './Registration/RegistrationAlert';

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Alerts 
        title="Want to get involved? Apply to volunteer at exploretech.la 2022!"
        messages={[
          "Volunteers will be responsible for providing mentorship for high school students through a group mentorship session, facilitating workshops, and helping with logistics. All majors and backgrounds are welcome, no prior knowledge in engineering or tech is required! Lunch and a free t-shirt will be provided.",
          "Applications are due on Friday, February 18 at 11:59 PM PST"
        ]}
        primaryLink="https://tinyurl.com/exploretech2022volunteer"
        primaryText="Apply now!"
      />
      <RegistrationAlert />
      <About />
      <GetInvolved />
      <Speakers />
      <Sponsors />
      <Footer />
    </div>
  );
}

Home.displayName = "Home";
export default Home;
