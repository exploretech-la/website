import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import HomePageSections from "constants/HomePageSections";

import LogoWithIcons from "static/svg/logo-with-icons-navy.svg";
import CompassLogo from "static/svg/logo-compass.svg";

const IGNITE_ENABLED = false;

function Header() {
  // let navItems = [];
  let isHomePage = false;
  let isIgnitePage = false;

  const location = useLocation();
  const history = useHistory();
  const pendingHash = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    pendingHash.current = history.action === "POP" ? null : location.hash;
    setExpanded(false);
  }, [location.key, location.hash, history]);
  if (location.pathname === "/") {
    isHomePage = true;
  }

  if (location.pathname === "/ignite" && IGNITE_ENABLED) {
    isIgnitePage = true;
  }

  // if (location.pathname === '/our_team') {
  //   navItems = ourTeamNavItems;
  // }
  // if (location.pathname === '/resources') {
  //   navItems = resourcesNavItems;
  // }

  const classNames = classnames("Section", "Header", {
    Home: isHomePage,
    IgniteHeader: isIgnitePage,
  });

  const navBarItems = (
    <Nav>
      <NavDropdown title="Home" id="navbar-home">
        <NavDropdown.Item as={Link} to="/">
          Home
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={`/#${HomePageSections.ABOUT.name}`}>
          About
        </NavDropdown.Item>
        <NavDropdown.Item
          as={Link}
          to={`/#${HomePageSections.GET_INVOLVED.name}`}
        >
          {" "}
          Get Involved{" "}
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={`/#${HomePageSections.SPEAKERS.name}`}>
          {" "}
          Speakers{" "}
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={`/#${HomePageSections.SPONSORS.name}`}>
          {" "}
          Sponsors{" "}
        </NavDropdown.Item>
      </NavDropdown>

      <Nav.Item>
        {" "}
        <Nav.Link as={Link} to="/our_team">
          Our Team
        </Nav.Link>{" "}
      </Nav.Item>

      <NavDropdown title="Events" id="navbar-events">
        <NavDropdown.Item as={Link} to="/ignite">
          Ignite
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Resources" id="navbar-resources">
        <NavDropdown.Item as={Link} to="/resources2026">
          exploretech 2026
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/resources2023">
          exploretech 2023
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/resources">
          exploretech 2021
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  return (
    <Navbar
      className={classNames}
      expanded={expanded}
      onToggle={(next) => {
        pendingHash.current = null;
        setExpanded(next);
      }}
      expand="sm"
    >
      <Navbar.Brand as={Link} to="/">
        <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
        <img
          src={LogoWithIcons}
          className="logo-with-icons"
          alt="logo-with-icons"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse
        className="justify-content-end"
        onExited={() => {
          const target =
            pendingHash.current &&
            document.getElementById(pendingHash.current.slice(1));
          pendingHash.current = null;
          if (target) target.scrollIntoView();
        }}
      >
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
