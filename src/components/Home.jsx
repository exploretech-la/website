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
        title="Want to get involved? Volunteer with us on event day!"
        messages={[
          // "exploretech will be recruiting in Fall! Catch us at the Enormous Activities Fair (EAF) on 9/26 and Engineering Welcome Day (EWD) on 9/27. For even more information and conversations with current exploretech members, join us for our info session on 10/5 from 7-8 pm at Engineering VI Rm 289!"
          "exploretech.la is recruiting volunteers NOW and it is open to ALL MAJORS! If you would like to join us in inspiring high school students, sign up to be a volunteer by Sunday 2/18/24 at 11:59 pm! For more information, check out the link below!"
        ]}
        primaryLink="https://forms.gle/GmxjCU5f5ay3mbHFA"
        // primaryText="Applications out soon"
        // title="Want to get involved? Apply to volunteer at exploretech.la 2024!"
        // messages={[
        //   "Volunteers will be responsible for providing mentorship for high school students through a group mentorship session, facilitating workshops, and helping with logistics. All majors and backgrounds are welcome, no prior knowledge in engineering or tech is required! Lunch and a free t-shirt will be provided."
        // ]}
        // primaryLink="https://forms.gle/yX983EuDFWG1DPSo9"
        primaryText="Sign up here!"
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
