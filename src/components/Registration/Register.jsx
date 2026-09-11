import React from "react";

import RegistrationAlert from "./RegistrationAlert";
// import RegistrationTop from './RegistrationTop';
// import Eligibility from './Eligibility';
import Waivers from "./Waivers";
import ImportantLinks from "./ImportantLinks";
import FAQ from "./FAQ";
import Footer from "../Footer";
import Schedule from "./Schedule";

import images from "constants/optimizedImages";

function Register() {
  return (
    <div className="Register">
      <div className="banner">
        {/*
          The banner is the first thing on the page, so it stays eager and
          keeps its intrinsic dimensions to reserve the space it needs.
        */}
        <img
          {...images["images/banner.png"]}
          sizes="100vw"
          decoding="async"
          className="banner"
          alt="banner"
        />
      </div>
      <RegistrationAlert />
      <div className="registration-title">
        <h1>Event Information</h1>
      </div>
      {/* <RegistrationTop /> */}
      <Schedule />
      {/* <Eligibility /> */}
      <ImportantLinks />
      <FAQ />
      <Waivers />
      <Footer />
    </div>
  );
}

Register.displayName = "Register";
export default Register;
