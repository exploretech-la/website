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
        title="Want to get involved? Apply to join us as a staff member for exploretech.la 23/24!"
        messages={[
          // "exploretech will be recruiting in Fall! Catch us at the Enormous Activities Fair (EAF) on 9/26 and Engineering Welcome Day (EWD) on 9/27. For even more information and conversations with current exploretech members, join us for our info session on 10/5 from 7-8 pm at Engineering VI Rm 289!"
          "exploretech.la is recruiting NOW! Applications are out now and are due 10/7/23 @ 11:59 pm! For more information, come out to our info session Thursday 10/5/23 from 7-8 pm in Engineering VI Rm 289"
        ]}
        primaryLink="https://docs.google.com/forms/d/e/1FAIpQLSdhQq-kZLjrr3OuKdRzVVEt1-VX7wTrztZApk02VAzVLl9Hkg/viewform"
        // primaryText="Applications out soon"
        // title="Want to get involved? Apply to volunteer at exploretech.la 2024!"
        // messages={[
        //   "Volunteers will be responsible for providing mentorship for high school students through a group mentorship session, facilitating workshops, and helping with logistics. All majors and backgrounds are welcome, no prior knowledge in engineering or tech is required! Lunch and a free t-shirt will be provided."
        // ]}
        // primaryLink="https://forms.gle/yX983EuDFWG1DPSo9"
        primaryText="Apply now!"
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
