import React from "react";
import Hero from './Hero';
import Alerts from './common/Alerts'
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';
import RegistrationAlert from './Registration/RegistrationAlert';

// "Applications are due on Friday, October 7 at 11:59 PM PST"

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Alerts 
        title="UCLA Students: Want to get involved? Apply to be in our team!"
        messages={[
          "exploretech will begin recruiting in Fall. Stay tuned for more information!"
          // "exploretech.la is recruiting members throughout Summer! If you would like to join us in inspiring high school students, apply by 07/14/2025! All MAJORS welcome. For more information, check out the link below!"
        ]}
        primaryLink="https://forms.gle/mT2T6QYNXBJHpAAc9"
        // primaryText="Applications out soon"
        // title="Want to get involved? Apply to volunteer at exploretech.la 2024!"
        // messages={[
        //   "Volunteers will be responsible for providing mentorship for high school students through a group mentorship session, facilitating workshops, and helping with logistics. All majors and backgrounds are welcome, no prior knowledge in engineering or tech is required! Lunch and a free t-shirt will be provided."
        // ]}
        // primaryLink="https://forms.gle/yX983EuDFWG1DPSo9"
        primaryText="Apply here!"
        // primaryText="Applications out soon!"
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