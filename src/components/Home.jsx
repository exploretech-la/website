import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import InvolvementCards from './InvolvementCards';
import About from './About';
import Schedule from './Schedule';
import Footer from './Footer';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <About />
                {/* <Schedule /> */}
                {/* <InvolvementCards /> */}
                <Footer />
            </div>
        );
    }
}
