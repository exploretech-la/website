import React from 'react';

import RegistrationTop from './RegistrationTop';
import Eligibility from './Eligibility';
import FAQ from './FAQ';
import Footer from '../Footer';

function Register() {
  return (
    <div className="Register">
      <RegistrationTop />
      <Eligibility />
      <FAQ />
      <Footer />
    </div>
  );
}

Register.displayName = 'Register';
export default Register;
