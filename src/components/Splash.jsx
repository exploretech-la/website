import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { MdExpandMore } from 'react-icons/md';

import { ReactComponent as LogoWithIcons } from '../static/svg/exploretechla-logo-with-icons.svg';

export default class Splash extends Component {
    render() {
        return (
            <div className="Splash">
                <div className="splash-body">
                    <LogoWithIcons className="logo-with-icons" />
                    <p>Inspiring students to explore opportunities in computer science, engineering, and technology.</p>
                    <p><Button variant="primary">Learn more</Button></p>
                </div>
                <MdExpandMore className="expand-icon" size="2em" />
            </div>
        );
    }
}
