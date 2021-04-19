/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import ListPosts from './components/ListPosts';
import ScrollButton from '../../components/Buttons/ScrollButton';
import MenuContainer from './components/menu/MenuContainer';
import MobileButton from '../../components/Buttons/MobileButton';

const Dashboard = ({
  auth, getPosts, posts, createPost, signOut, getLikedPosts,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileModal, setMobileModal] = useState(false);

  useEffect(() => {
    getPosts(currentPage);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
    getLikedPosts(currentPage);
  }, [auth]);

  const getMobileMenu = (isActive) => {
    setMobileModal(isActive);
  };

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== '' && currentUser.username !== undefined
      && (
      <div className="dashboard-container">
        <div className="menu-container">
          {mobileModal && <MenuContainer currentUser={currentUser} />}
        </div>
        <div className="feed-container">
          <CreatePost
            createPost={createPost}
            username={currentUser.username}
            profileImage={currentUser.profileImage}
          />
          <ListPosts
            posts={posts.currentPosts}
            likedPosts={posts.likedPosts}
          />
        </div>
        <div className="news-container">
          {/* <MenuContainer /> */}
          <div className="news-content" />
        </div>
      </div>
      )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
      <ScrollButton />
      <MobileButton getMobileMenu={getMobileMenu} />
    </>
  );
};

export default Dashboard;
