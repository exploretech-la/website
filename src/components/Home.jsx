import React from "react";
import Hero from './Hero';
import Alerts from './common/Alerts'
import About from './About';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';

// "Applications are due on Friday, October 7 at 11:59 PM PST"

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Alerts 
        title="Want to get involved? Join our team!"
        messages={[
          "exploretech is currently recruiting for design and external teams over summer and content and operations in the fall"
        ]}
        primaryLink="#"
        primaryText="Applications out soon!"
      />
      <About />
      <Speakers />
      <Sponsors />
      <Footer />
    </div>
  );
}

Home.displayName = "Home";
export default Home;
