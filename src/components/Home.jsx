import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import GetInvolved from './GetInvolved';
import Speakers from './Speakers';
import Leadership from './Leadership';
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
                <About />
                <GetInvolved />
                <Speakers />
                <Leadership />
                <Sponsors />
                <Footer />
            </div>
        );
    }
}
