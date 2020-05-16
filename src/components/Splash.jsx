import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { MdExpandMore } from 'react-icons/md';

import './Splash.scss';

export default class Splash extends Component {
    render() {
        return (
            <div className="splash">
                <div className="splash-body">
                    <h1>exploretech.la</h1>
                    <p>Inspiring students to explore opportunities in computer science, engineering, and technology.</p>
                    <p><Button variant="primary">Learn more</Button></p>
                </div>
                <MdExpandMore className="expand-icon" size="2em" />
            </div>
        );
    }
}
