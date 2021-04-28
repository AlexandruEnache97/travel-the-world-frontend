import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Dashboard/components/Navbar';
import './profilePage.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import ListPosts from '../Dashboard/components/posts/ListPosts';
import CreatePost from '../Dashboard/components/posts/CreatePost';
import { getUserPosts, getUserLikedPosts } from '../../service/postsApi';
import MenuContainer from '../Dashboard/components/menu/MenuContainer';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

const ProfilePage = ({ auth, createPost, signOut }) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [likedUserPosts, setLikedUserPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(async () => {
    setLoading('loading');
    const { data } = await getUserPosts(1);
    const likedPosts = await getUserLikedPosts(1);
    setUserPosts(data.posts);
    setLikedUserPosts(likedPosts.data.likedPosts);
    setLoading(null);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  return (
    <div className="profile-page">
      <Navbar signOut={signOut} />
      <MenuContainer currentUser={currentUser} />
      <div className="profile-container">
        <CreatePost
          createPost={createPost}
          username={currentUser.username}
          profileImage={currentUser.profileImage}
        />
        <ListPosts
          posts={userPosts}
          likedPosts={likedUserPosts}
        />
      </div>
      <img className="profile-background" src={backgroundGradient} alt="profileGradient" />
      <LoadingOverlay loading={{ loadingState: [loading] }} />
    </div>
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
};

export default ProfilePage;
