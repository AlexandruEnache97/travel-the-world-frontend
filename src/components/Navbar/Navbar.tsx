import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/LogoHeaderWhite.png';
import './navbar.scss';
import SearchPosts from '../Search/SearchPosts';

interface Props {
  signOut: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<Props> = ({ signOut }) => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img className="logo" src={logo} alt="logoHeader" />
        </Link>
        {location.pathname !== '/dashboard' && (
          <Link to="/" className="back-button">
            Back
          </Link>
        )}
      </div>
      <SearchPosts />
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
};

export default Navbar;
