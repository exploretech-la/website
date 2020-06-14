import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LogoWithIcons from '../static/svg/logo-with-icons-navy.svg';
import CompassLogo from '../static/svg/logo-compass.svg';

export default class Header extends Component {
    render() {
        return (
            <Navbar className="Header" collapseOnSelect expand="sm">
                <Navbar.Brand>
                    <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
                    <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link>About</Nav.Link>
                        <Nav.Link>Schedule</Nav.Link>
                        <Nav.Link>Sponsors</Nav.Link>
                        <Nav.Link>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
