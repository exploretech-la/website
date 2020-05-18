import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { MdExpandMore } from 'react-icons/md';

import LogoWithIconGroup from '../static/svg/logo-navy-with-icon-group-white.svg';

export default class Splash extends Component {
    render() {
        return (
            <div className="Splash">
                <div className="splash-body">
                    <img src={LogoWithIconGroup} className="logo-with-icon-group" alt="logo-with-icon-group" />
                    <div className="splash-content">
                        <h1>Inspiring the Future of Tech.</h1>
                        <Button variant="primary">Learn more</Button>
                    </div>
                </div>
                <MdExpandMore className="expand-icon" size="2em" />
            </div>
        );
    }
}
