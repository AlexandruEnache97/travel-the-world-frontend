import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar.tsx';
import UserInfo from './components/UserInfo';
import ScrollButton from '../../components/Buttons/ScrollButton.tsx';
import ProfileUserPosts from '../ProfilePage/components/ProfileUserPosts';
import ParallaxContent from '../../components/Parallax/ParallaxContent.tsx';

import '../ProfilePage/profilePage.scss';

const UserPage = ({ location, signOut, createAlert }) => {
  const { userId, username, profileImage } = location.state;

  return (
    <>
      <Navbar signOut={signOut} />
      <div className="profile-page">
        <UserInfo username={username} profileImage={profileImage} />
        <div className="profile-container">
          <div className="profile-menu" id="userRef">
            <button
              id="profileRef"
              className="active-button"
              type="button"
            >
              User posts
            </button>
          </div>
          <ProfileUserPosts createAlert={createAlert} userAccountId={userId} />
          <ScrollButton refId="userRef" />
        </div>
        <ParallaxContent />
      </div>
    </>
  );
};

UserPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default UserPage;
