import React from 'react';
import Header from './components/Header';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import './LandingPage.scss';
import LandingContainer from './components/LandingContainer';

const LandingPage = () => (
  <div className="landing-container">
    <Header />
    <div className="landing-content">
      <LandingContainer />
    </div>
    <img className="landing-background" src={backgroundGradient} alt="backgroundGradient" />
  </div>
);

export default LandingPage;
