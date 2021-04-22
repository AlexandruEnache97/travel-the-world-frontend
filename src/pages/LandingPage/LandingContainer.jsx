/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import mountains from '../../images/Flat-Mountains.svg';
import logo from '../../images/logo_planet.png';
import LandingContent from './components/LandingContent';
import ConnectedSignIn from './components/ConnectedSignIn';
import ConnectedRegister from './components/ConnectedRegister';

const LandingContainer = ({ locationPath }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(locationPath);
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  return (
    <div className="content">
      {(windowWidth > 601 || locationPath === '/') && (
        <>
          <span className="content-title">Welcome to Travel the World</span>
          <img className="content-logo" src={logo} alt="logoPlanet" />
        </>
      )}
      <Route exact path="/" component={LandingContent} />
      <Route exact path="/login" component={ConnectedSignIn} />
      <Route exact path="/register" component={ConnectedRegister} />

      {(windowWidth > 601 || locationPath === '/') && (
        <span>
          <img className="content-background" src={mountains} alt="backgroundContainer" />
        </span>
      )}
    </div>
  );
};
export default LandingContainer;
