/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import Header from './components/Header';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import './LandingPage.scss';
import LandingContainer from './LandingContainer';
import { getFromLocalStorage } from '../../utils/localStorage';
import { setToken } from '../../utils/authUtils';

const LandingPage = ({ verifyAuth, history }) => {
  useLayoutEffect(() => {
    const token = getFromLocalStorage('token');
    const accountId = getFromLocalStorage('accountId');

    if (token && accountId) {
      setToken(token);
      verifyAuth({ accountId });
      history.push('/dashboard');
    }
  }, []);

  return (
    <div className="landing-container">
      <Header />
      <div className="landing-content">
        <LandingContainer />
      </div>
      <img className="landing-background" src={backgroundGradient} alt="backgroundGradient" />
    </div>
  );
};

export default LandingPage;
