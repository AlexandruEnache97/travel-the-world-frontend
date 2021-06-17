import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';
import './profilePage.scss';
import ScrollButton from '../../components/Buttons/ScrollButton';
import ProfileInfo from './components/ProfileInfo';
import ProfileMenu from './components/ProfileMenu';
import Alert from '../../components/Alerts/ConnectedAlert';
import ProfileUserPosts from './components/ProfileUserPosts';

const ProfilePage = ({
  auth, createPost, signOut, getAccount, createAlert,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  const updateInfo = async () => {
    await getAccount(auth.accountId);
    setCurrentUser(accountData);
  };

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== '' && currentUser.username !== undefined
        && (
          <div className="profile-page">
            <ProfileInfo
              currentUser={currentUser}
              updateInfo={updateInfo}
            />
            <div className="profile-container">
              <ProfileMenu
                createPost={createPost}
                currentUser={currentUser}
                createAlert={createAlert}
              />
              <ProfileUserPosts createAlert={createAlert} />
              <ScrollButton refId="profileRef" />
            </div>
          </div>
        )}
      <Alert />
    </>
  );
};

ProfilePage.propTypes = {
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
  createPost: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  getAccount: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default ProfilePage;
