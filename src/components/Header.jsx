import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import HomePageSections from 'constants/HomePageSections';

import LogoWithIcons from '../static/svg/logo-with-icons-navy.svg';
import CompassLogo from '../static/svg/logo-compass.svg';

export default class Header extends Component {
    render() {
        return (
            <Navbar className="Header" collapseOnSelect expand="sm">
                <Navbar.Brand href="/">
                    <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
                    <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item><Nav.Link href={`#${HomePageSections.ABOUT.name}`}>About</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href={`#${HomePageSections.GET_INVOLVED.name}`}>Get Involved</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href={`#${HomePageSections.SPEAKERS.name}`}>Speakers</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href={`#${HomePageSections.SPONSORS.name}`}>Sponsors</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
