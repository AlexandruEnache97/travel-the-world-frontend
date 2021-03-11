import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/LogoHeader.png';
import './Header.scss';

// eslint-disable-next-line react/prop-types
const Header = () => (
  <div className="landing-header">
    <Link to="/">
      <img className="logo" src={logo} alt="logoHeader" />
    </Link>
  </div>
);

export default Header;
