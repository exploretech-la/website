import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="md">
                <Navbar.Brand>exploretech.la</Navbar.Brand>
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
