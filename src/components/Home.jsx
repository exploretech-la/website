import React from 'react';

import Hero from './Hero';
import Alerts from './Alerts'
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Leadership from './Leadership';
import Sponsors from './Sponsors';
import Footer from './Footer';
import RegistrationAlert from './Registration/RegistrationAlert';

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Alerts />
      <RegistrationAlert />
      <About />
      <GetInvolved />
      <Speakers />
      <Leadership />
      <Sponsors />
      <Footer />
    </div>
  );
}

Home.displayName = 'Home';
export default Home;
