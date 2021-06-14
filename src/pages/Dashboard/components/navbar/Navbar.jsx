import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../../../images/LogoHeaderWhite.png';
import './navbar.scss';

const Navbar = ({ signOut }) => (
  <div className="navbar-container">
    <div className="navbar-logo">
      <Link to="/">
        <img className="logo" src={logo} alt="logoHeader" />
      </Link>
    </div>
    <div className="navbar-sign-out">
      <button
        type="button"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  </div>
);

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
