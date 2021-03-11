import React from 'react';
import { Link } from 'react-router-dom';

const LandingContent = () => (
  <div>
    <span className="content-description">Share your travel experiences and enhance new ones by enjoying this world together!</span>
    <span className="content-text">Conquer the world and discover it!</span>
    <Link to="/login" className="button content-signIn" type="button">Sign In</Link>
    <Link to="/register" className="button content-signUp" type="button">Sign Up</Link>
  </div>
);

export default LandingContent;
