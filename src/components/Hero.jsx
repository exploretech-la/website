import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import HomePageSections from 'constants/HomePageSections';

import LogoWithIconGroup from '../static/svg/logo-navy-with-icon-group-white.svg';

export default class Hero extends Component {
    render() {
        return (
            <section className="Section Hero">
                {/* <div className="hero-body">
                    
                </div> */}
                <img src={LogoWithIconGroup} className="logo-with-icon-group" alt="logo-with-icon-group" />
                    <div className="hero-content">
                        <h1 className="h1-title">Inspire the Future&nbsp;of&nbsp;Tech</h1>
                        <h2 className="h2-title">Inspire the Future&nbsp;of&nbsp;Tech</h2>
                        <p>April 10-11, 2021</p>
                        <p>University of California, Los Angeles</p>
                        <div className="hero-cta">
                            <Button variant="info" href={`#${HomePageSections.GET_INVOLVED.name}`}>Get Involved</Button>
                            <Button variant="light" href={`#${HomePageSections.ABOUT.name}`}>Learn More</Button>
                        </div>
                    </div>
            </section>
        );
    }
}
