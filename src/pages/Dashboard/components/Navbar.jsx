import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../../images/LogoHeader.png';
import './navbar.scss';

const Navbar = ({ signOut }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img className="logo" src={logo} alt="logoHeader" />
        </Link>
      </div>
      <div className="navbar-sign-out">
        <button
          type="button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
