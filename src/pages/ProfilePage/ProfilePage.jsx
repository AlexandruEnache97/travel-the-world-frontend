import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Dashboard/components/Navbar';
import './profilePage.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import ListPosts from '../Dashboard/components/posts/ListPosts';
import { getUserPosts, getUserLikedPosts } from '../../service/postsApi';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import ScrollButton from '../../components/Buttons/ScrollButton';
import ProfileInfo from './components/ProfileInfo';
import ProfileMenu from './components/ProfileMenu';
import Alert from '../../components/Alerts/ConnectedAlert';

const ProfilePage = ({
  auth, createPost, signOut, getAccount, createAlert,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState({});
  const [profilePosts, setProfilePosts] = useState({
    userPosts: [],
    totalResults: 0,
    likedUserPosts: [],
  });
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    setLoading('loading');
    const { data } = await getUserPosts(currentPage);
    const likedPosts = await getUserLikedPosts(currentPage);
    setProfilePosts({
      userPosts: data.posts,
      totalResults: data.totalResults,
      likedUserPosts: likedPosts.data.likedPosts,
    });
    setLoading(null);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  const updateInfo = async () => {
    await getAccount(auth.accountId);
    setCurrentUser(accountData);
  };

  const getMorePosts = async () => {
    setLoading('loading');
    const { data } = await getUserPosts(currentPage + 1);
    const likedPosts = await getUserLikedPosts(currentPage + 1);
    setCurrentPage(currentPage + 1);
    setProfilePosts({
      userPosts: [...profilePosts.userPosts, ...data.posts],
      totalResults: data.totalResults,
      likedUserPosts: [...profilePosts.likedUserPosts, ...likedPosts.data.likedPosts],
    });
    setLoading(null);
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
              <ListPosts
                posts={profilePosts.userPosts}
                likedPosts={profilePosts.likedUserPosts}
                hasMore={profilePosts.totalResults > currentPage * 10}
                getMorePosts={getMorePosts}
                createAlert={createAlert}
              />
              <ScrollButton refId="profileRef" />
            </div>

          </div>
        )}
      <img className="profile-background" src={backgroundGradient} alt="profileGradient" />
      <LoadingOverlay loading={{ loadingState: [loading] }} />
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
