import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { MdExpandMore } from 'react-icons/md';

import LogoWithIconGroup from '../static/svg/logo-navy-with-icon-group-white.svg';

export default class Hero extends Component {
    render() {
        return (
            <div className="Hero">
                <div className="hero-body">
                    <img src={LogoWithIconGroup} className="logo-with-icon-group" alt="logo-with-icon-group" />
                    <div className="hero-content">
                        <h1>Inspiring the Future of Tech.</h1>
                        <div className="event-info">
                            <p>March 6th, 2020</p>
                            <p>University of California, Los Angeles</p>
                        </div>
                        <Button variant="primary">Learn more</Button>
                    </div>
                </div>
                {/* <MdExpandMore className="expand-icon" size="2em" /> */}
            </div>
        );
    }
}
