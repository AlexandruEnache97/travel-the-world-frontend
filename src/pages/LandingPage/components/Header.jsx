import React from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../../../images/LogoHeaderWhite.png';
import './Header.scss';

const Header = () => (
  <div className="landing-header">
    <Link to="/">
      <img className="logo" src={logoHeader} alt="logoHeader" />
    </Link>
  </div>
);

export default Header;
