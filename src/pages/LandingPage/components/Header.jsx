import React from 'react';
import Logo from '../../../images/LogoHeader.png';
import './Header.scss';

const Header = () => (
  <div className="landing-header">
    <img className="logo" src={Logo} alt="logo" />
  </div>
);

export default Header;
