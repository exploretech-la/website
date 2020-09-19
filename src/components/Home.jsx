import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';

// import COVID19Update from './COVID19Update';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                {/* <COVID19Update /> */}
                <About />
                <GetInvolved />
                <Speakers />
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
