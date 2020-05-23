import React, { Component } from 'react';

import Header from './Header';
import Hero from './Hero';
import InvolvementCards from './InvolvementCards';
import About from './About';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <Hero />
                <div className="page-content">
                    {/* <InvolvementCards /> */}
                    <About />
                </div>
            </div>
        );
    }
}
