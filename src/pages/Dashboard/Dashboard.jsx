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
  auth, getPosts, posts, createPost, signOut,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    getPosts(1);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
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
        <ListPosts posts={posts.currentPosts} />
      </div>
      )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
      <ScrollButton />
    </>
  );
};

export default Dashboard;
