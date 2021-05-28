import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import Navbar from './components/navbar/Navbar';
import ScrollButton from '../../components/Buttons/ScrollButton';
import MenuContainer from './components/menu/MenuContainer';
import Alert from '../../components/Alerts/ConnectedAlert';
import PostsContainer from './components/posts/ConnectedPostsContainer';

const Dashboard = ({ auth, signOut }) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== '' && currentUser.username !== undefined
        && (
          <div className="dashboard-container">
            <MenuContainer currentUser={currentUser} />
            <PostsContainer currentUser={currentUser} />
          </div>
        )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
      <ScrollButton refId="topRef" />
      <Alert />
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Dashboard;
