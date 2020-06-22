import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import Sponsors from './Sponsors';
import Footer from './Footer';

// import InvolvementCards from './InvolvementCards';
// import Schedule from './Schedule';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <About />
                {/* <Schedule /> */}
                {/* <InvolvementCards /> */}
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
