import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import './LandingPage.scss';
import LandingContainer from './LandingContainer';
import { getFromLocalStorage } from '../../utils/localStorage';
import { setToken } from '../../utils/authUtils';
import Alert from '../../components/Alerts/ConnectedAlert';

const LandingPage = ({ verifyAuth, history, location }) => {
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
        <LandingContainer locationPath={location.pathname} />
      </div>
      <img className="landing-background" src={backgroundGradient} alt="backgroundGradient" />
      <Alert />
    </div>
  );
};

LandingPage.propTypes = {
  verifyAuth: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingPage;
