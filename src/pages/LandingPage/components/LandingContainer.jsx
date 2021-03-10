import React from 'react';
import mountains from '../../../images/Flat-Mountains.svg';
import logo from '../../../images/logo_planet.png';
import SignIn from './SignIn';

const LandingContainer = () => (
  <div className="content">
    <span className="content-title">Welcome to Travel the World</span>
    <img className="content-logo" src={logo} alt="logoPlanet" />
    <SignIn />
    <span>
      <img className="content-background" src={mountains} alt="backgroundContainer" />
    </span>
  </div>
);

export default LandingContainer;
