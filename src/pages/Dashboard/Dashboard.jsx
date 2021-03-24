/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import ListPosts from './components/ListPosts';
import ScrollButton from '../../components/Buttons/ScrollButton';

const Dashboard = ({
  auth, getPosts, posts, createPost, signOut, getLikedPosts,
}) => {
  const { accountData, accountId } = auth;
  const [currentUser, setCurrentUser] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts(currentPage);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
    getLikedPosts(currentPage, accountId);
  }, [auth]);

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser.username !== ''
      && (
      <div className="dashboard-container">
        <CreatePost
          createPost={createPost}
          username={currentUser.username}
          profileImage={currentUser.profileImage}
        />
        <ListPosts userId={accountId} posts={posts.currentPosts} likedPosts={posts.likedPosts} />
      </div>
      )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
      <ScrollButton />
    </>
  );
};

export default Dashboard;
