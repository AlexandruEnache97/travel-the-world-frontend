import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar.tsx';
import './profilePage.scss';
import ScrollButton from '../../components/Buttons/ScrollButton.tsx';
import ProfileInfo from './components/ProfileInfo';
import ProfileMenu from './components/ProfileMenu';
import Alert from '../../components/Alerts/ConnectedAlert';
import ProfileUserPosts from './components/ProfileUserPosts';
import ProfileSavedPosts from './components/ProfileSavedPosts';
import ParallaxContent from '../../components/Parallax/ParallaxContent.tsx';

const ProfilePage = ({
  auth, createPost, signOut, getAccount, createAlert,
}) => {
  const { accountId, accountData } = auth;
  const [currentUser, setCurrentUser] = useState({});
  const [userAccountId, setUserAccountId] = useState('');
  const [currentList, setCurrentList] = useState('Your posts');

  useEffect(() => {
    setCurrentUser(accountData);
    setUserAccountId(accountId);
  }, [auth]);

  const updateInfo = async () => {
    await getAccount(auth.accountId);
    setCurrentUser(accountData);
  };

  const showSavedPosts = (postList) => {
    setCurrentList(postList);
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
              showSavedPosts={showSavedPosts}
            />
            <div className="profile-container">
              <ProfileMenu
                title={currentList}
                createPost={createPost}
                currentUser={currentUser}
                createAlert={createAlert}
                showSavedPosts={showSavedPosts}
              />
              {currentList === 'Your posts' ? (
                <ProfileUserPosts
                  createAlert={createAlert}
                  userAccountId={userAccountId}
                />
              ) : <ProfileSavedPosts createAlert={createAlert} />}
              <ScrollButton refId="profileRef" />
            </div>
            <ParallaxContent />
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
