import React from 'react';
import mountains from '../../../images/Flat-Mountains.svg';
import logo from '../../../images/logo_planet.png';

const LandingContainer = () => (
  <div className="content">
    <span className="content-title">Welcome to Travel the World</span>
    <span className="content-description">Share your travel experiences and enhance new ones by enjoying this world together!</span>
    <span className="content-text">Conquer the world and discover it!</span>
    <img className="content-logo" src={logo} alt="logo-planet" />
    <button className="content-signIn" type="button">Sign In</button>
    <button className="content-signUp" type="button">Sign Up</button>
    <span>
      <img className="content-background" src={mountains} alt="" />
    </span>
  </div>
);

export default LandingContainer;
