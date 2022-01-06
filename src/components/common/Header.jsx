import React from 'react';
import { useLocation } from 'react-router-dom'
import classnames from 'classnames';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { homeNavItems, ourTeamNavItems, resourcesNavItems } from 'constants/navigation';

import LogoWithIcons from 'static/svg/logo-with-icons-navy.svg';
import CompassLogo from 'static/svg/logo-compass.svg';

function Header() {
  let navItems = [];
  let isHomePage = false;
  const location = useLocation();
  if (location.pathname === '/') {
    navItems = homeNavItems;
    isHomePage = true;
  }
  if (location.pathname === '/our_team') {
    navItems = ourTeamNavItems;
  }
  if (location.pathname === '/resources') {
    navItems = resourcesNavItems;
  }

  const classNames = classnames(
    'Section',
    'Header',
    { 'Home': isHomePage },
  );

  return (
    <Navbar className={classNames} collapseOnSelect expand="sm">
      <Navbar.Brand href="/">
        <img src={CompassLogo} className="logo-compass" alt="logo-compass" />
        <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {navItems.map(item => {
            return <Nav.Item key={item.key}><Nav.Link href={item.href}>{item.name}</Nav.Link></Nav.Item>
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
