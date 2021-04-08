import React from 'react';

import RegistrationAlert from './RegistrationAlert';
// import RegistrationTop from './RegistrationTop';
// import Eligibility from './Eligibility';
import Waivers from './Waivers';
import ImportantLinks from './ImportantLinks';
import FAQ from './FAQ';
import Footer from '../Footer';
import Schedule from './Schedule';

import Banner from 'static/images/banner.png';

function Register() {
  return (
    <div className="Register">
      <div className="banner">
        <img src={Banner} className="banner" alt="banner" />
      </div>
      <RegistrationAlert />
      <div className="registration-title">
          <h1>Event Information</h1>
      </div>
      {/* <RegistrationTop /> */}
      <Schedule />
      {/* <Eligibility /> */}
      <ImportantLinks />
      {/* <Waivers /> */}
      <FAQ />
      <Footer />
    </div>
  );
}

Register.displayName = 'Register';
export default Register;
