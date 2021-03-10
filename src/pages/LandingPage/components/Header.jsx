import React from 'react';
import logo from '../../../images/LogoHeader.png';
import './Header.scss';

const Header = () => (
  <div className="landing-header">
    <img className="logo" src={logo} alt="logoHeader" />
  </div>
);

export default Header;
