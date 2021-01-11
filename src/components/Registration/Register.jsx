import React from 'react';

import RegistrationAlert from './RegistrationAlert';
import RegistrationTop from './RegistrationTop';
import Eligibility from './Eligibility';
import Waivers from './Waivers';
import FAQ from './FAQ';
import Footer from '../Footer';
import Schedule from './Schedule';

function Register() {
  return (
    <div className="Register">
      <div className="registration-title">
          <h1>Registration</h1>
      </div>
      <RegistrationAlert />
      <RegistrationTop />
      <Schedule />
      <Eligibility />
      <Waivers />
      <FAQ />
      <Footer />
    </div>
  );
}

Register.displayName = 'Register';
export default Register;
