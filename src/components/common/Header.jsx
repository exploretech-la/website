import React from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import HomePageSections from "constants/HomePageSections";

import LogoWithIcons from "static/svg/logo-with-icons-navy.svg";
import CompassLogo from "static/svg/logo-compass.svg";

function Header() {
  // let navItems = [];
  let isHomePage = false;
  const location = useLocation();
  if (location.pathname === "/") {
    isHomePage = true;
  }
  // if (location.pathname === '/our_team') {
  //   navItems = ourTeamNavItems;
  // }
  // if (location.pathname === '/resources') {
  //   navItems = resourcesNavItems;
  // }

  const classNames = classnames("Section", "Header", { Home: isHomePage });

  const navBarItems = (
    <Nav>
      <NavDropdown title="Home" id="navbarScrollingDropdown" href="/">
        <NavDropdown.Item href="/">Home</NavDropdown.Item>
        <NavDropdown.Item href={`/#${HomePageSections.ABOUT.name}`}>
          About
        </NavDropdown.Item>
        <NavDropdown.Item href={`/#${HomePageSections.GET_INVOLVED.name}`}>
          {" "}
          Get Involved{" "}
        </NavDropdown.Item>
        <NavDropdown.Item href={`/#${HomePageSections.SPEAKERS.name}`}>
          {" "}
          Speakers{" "}
        </NavDropdown.Item>
        <NavDropdown.Item href={`/#${HomePageSections.SPONSORS.name}`}>
          {" "}
          Sponsors{" "}
        </NavDropdown.Item>
      </NavDropdown>

      <Nav.Item>
        {" "}
        <Nav.Link href="/our_team">Our Team</Nav.Link>{" "}
      </Nav.Item>

      <NavDropdown title="Resources" id="navbarScrollingDropdown">
        <NavDropdown.Item href={`/resources`}>
          exploretech.la 2021
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  return (
    <Navbar className={classNames} collapseOnSelect expand="sm">
      <Navbar.Brand href="/">
        <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
        <img
          src={LogoWithIcons}
          className="logo-with-icons"
          alt="logo-with-icons"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {navBarItems}
          {/* {navBarItems.map(item => {
            return <Nav.Item key={item.key}><Nav.Link href={item.href}>{item.name}</Nav.Link></Nav.Item>
          })} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
