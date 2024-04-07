import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from '../../components/LogoutButton';
import './Header.scss';
import matchLogo from '../../../images/logo192.png';
import svgLogo from '../../../images/makematcher-color-fire-transparent.svg';

export function HeaderComponent() {
  const location = useLocation();

  return (
    <>
      <nav className="header-wrapper">
        <Link to="/home" className="navbar-logo-link nav-logo" id="nav-logo">
          <img src={matchLogo} alt="" className="nav-logo-matchimage" />
          <img src={svgLogo} alt="" className="nav-logo-svgimage" />
        </Link>
        <div className="nav-links-wrapper">
          <Link
            to="/home"
            className={`navbar-link ${
              location.pathname === '/home' ? 'active' : ''
            }`}
            id="nav-link1"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`navbar-link ${
              location.pathname === '/profile' ? 'active' : ''
            }`}
            id="nav-link2"
          >
            Profile
          </Link>
          <Link
            to="/test"
            className={`navbar-link ${
              location.pathname === '/test' ? 'active' : ''
            }`}
            id="nav-link3"
          >
            Test
          </Link>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}
