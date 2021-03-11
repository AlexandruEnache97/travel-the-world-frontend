import React from 'react';
import { Route } from 'react-router-dom';
import mountains from '../../images/Flat-Mountains.svg';
import logo from '../../images/logo_planet.png';
import LandingContent from './components/LandingContent';
import SignIn from './components/SignIn';
import Register from './components/Register';

const LandingContainer = () => (
  <div className="content">
    <span className="content-title">Welcome to Travel the World</span>
    <img className="content-logo" src={logo} alt="logoPlanet" />
    <Route exact path="/" component={LandingContent} />
    <Route exact path="/login" component={SignIn} />
    <Route exact path="/register" component={Register} />
    <span>
      <img className="content-background" src={mountains} alt="backgroundContainer" />
    </span>
  </div>
);

export default LandingContainer;
