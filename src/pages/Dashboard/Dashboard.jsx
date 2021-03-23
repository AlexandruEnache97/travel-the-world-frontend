/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import { Link as LinkScroll } from 'react-scroll';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import ListPosts from './components/ListPosts';

const Dashboard = ({
  auth, getPosts, posts, createPost, signOut,
}) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    getPosts(1);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData);
  }, [auth]);

  return (
    <>
      <Navbar signOut={signOut} />
      {currentUser !== ''
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

      <LinkScroll
        to="topRef"
        spy
        smooth
        duration={800}
        offset={-100}
        onSetActive={() => setShowScroll(false)}
        onSetInactive={() => setShowScroll(true)}
      >
        {showScroll && (
          <img
            className="dashboard-scroll"
            src="https://img.icons8.com/ios-filled/100/ffffff/up-squared.png"
            alt="topButton"
          />
        )}
      </LinkScroll>

    </>
  );
};

export default Dashboard;
