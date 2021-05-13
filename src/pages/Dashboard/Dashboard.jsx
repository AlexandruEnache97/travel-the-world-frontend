import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import CreatePost from './components/posts/CreatePost';
import Navbar from './components/Navbar';
import ListPosts from './components/posts/ListPosts';
import ScrollButton from '../../components/Buttons/ScrollButton';
import MenuContainer from './components/menu/MenuContainer';

const Dashboard = ({
  auth, getPosts, posts, createPost, signOut, getLikedPosts,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts(currentPage);
    getLikedPosts(currentPage);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  const getMorePosts = () => {
    getPosts(currentPage + 1);
    getLikedPosts(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== '' && currentUser.username !== undefined
        && (
          <div className="dashboard-container">
            <MenuContainer currentUser={currentUser} />
            <div className="feed-container">
              <CreatePost
                createPost={createPost}
                username={currentUser.username}
                profileImage={currentUser.profileImage}
              />
              <ListPosts
                posts={posts.currentPosts}
                likedPosts={posts.likedPosts}
                hasMore={posts.totalResults > currentPage * 10}
                getMorePosts={getMorePosts}
              />
            </div>
            <div className="news-container">
              {/* <MenuContainer /> */}
              <div className="news-content" />
            </div>
          </div>
        )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
      <ScrollButton refId="topRef" />
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
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    currentPosts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      postImage: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      shares: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired,
    likedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
    singlePost: PropTypes.objectOf(PropTypes.string).isRequired,
    totalResults: PropTypes.number.isRequired,
  }).isRequired,
  createPost: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  getLikedPosts: PropTypes.func.isRequired,
};

export default Dashboard;
