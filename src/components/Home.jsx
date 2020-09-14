import React, { Component, createRef } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';

import COVID19Update from './COVID19Update';

// import Schedule from './Schedule';

export default class Home extends Component {
    constructor() {
        super();
        this.aboutRef = createRef();
    }

    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <COVID19Update />
                <About />
                {/* <Schedule /> */}
                <GetInvolved />
                <Speakers />
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
