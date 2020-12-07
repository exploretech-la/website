import React from 'react';
import { useLocation } from 'react-router-dom'
import classnames from 'classnames';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import HomePageSections from 'constants/HomePageSections';

import LogoWithIcons from 'static/svg/logo-with-icons-navy.svg';
import CompassLogo from 'static/svg/logo-compass.svg';

function Header() {
  let isHomePage = false;
  const location = useLocation();
  if (location.pathname === '/') {
    isHomePage = true;
  }

  const classNames = classnames(
    'Section',
    'Header',
    { 'Home': isHomePage },
  );

  const generalNavItems = (
    <Nav>
      <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
    </Nav>
  );

  const homeNavItems = (
    <Nav>
      <Nav.Item><Nav.Link href={`#${HomePageSections.ABOUT.name}`}>About</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href={`#${HomePageSections.GET_INVOLVED.name}`}>Get Involved</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href={`#${HomePageSections.SPEAKERS.name}`}>Speakers</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href={`#${HomePageSections.SPONSORS.name}`}>Sponsors</Nav.Link></Nav.Item>
    </Nav>
  );

  const navItems = isHomePage ? homeNavItems : generalNavItems;

  return (
    <Navbar className={classNames} collapseOnSelect expand="sm">
      <Navbar.Brand href="/">
        <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
        <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {navItems}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
