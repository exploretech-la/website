import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Footer from './Footer';

import GA from 'util/GoogleAnalytics';

export default class Home extends Component {
    componentDidMount() {
        const isGAEnabled = GA.init();
        if (isGAEnabled) {
            GA.trackPageView();
        }

        console.log("Hello!");
        console.log(process.env.TEST_SECRET);
    }

    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <About />
                <GetInvolved />
                <Speakers />
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
