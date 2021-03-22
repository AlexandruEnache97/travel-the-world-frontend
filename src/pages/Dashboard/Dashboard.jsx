/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';

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
        {posts.currentPosts !== [] && posts.currentPosts.map((post) => (
          <Post
            username={post.username}
            title={post.title}
            text={post.text}
            location={post.location}
            category={post.category}
            image={post.postImage}
            likes={post.likes}
            shares={post.shares}
            createdDate={post.createdDate}
            key={post.title + Math.random(0, 10000)}
          />
        ))}
      </div>
      )}
      <img className="dashboard-background" src={backgroundGradient} alt="backgroundGradient" />
    </>
  );
};

export default Dashboard;
