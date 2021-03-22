/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import ListPosts from './components/ListPosts';

const Dashboard = ({
  auth, getPosts, posts, createPost, signOut,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    getPosts(1);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData.username);
  }, [auth]);

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser !== ''
      && (
      <div className="dashboard-container">
        <CreatePost
          createPost={createPost}
          username={currentUser}
          userIcon="https://img.icons8.com/ios-filled/50/ffffff/cat-profile.png"
        />
        <ListPosts posts={posts.currentPosts} />
      </div>
      )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
    </>
  );
};

export default Dashboard;
