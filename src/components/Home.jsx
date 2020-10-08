import React, { Component } from 'react';

import Header from './Header';
import Alerts from './Alerts';
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
    }

    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <Alerts />
                <About />
                <GetInvolved />
                <Speakers />
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
