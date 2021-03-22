/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import './dashboard.scss';
// import { getSinglePost } from '../../service/postsApi';
import Post from './components/Post';
import CreatePost from './components/CreatePost';

const Dashboard = ({ auth, getPosts, posts }) => {
  const { accountData } = auth;
  const [currentUser, setCurrentUser] = useState('');
  // const [postData, setPostData] = useState({
  //   username: '',
  //   postId: '',
  //   title: '',
  //   text: '',
  //   location: '',
  //   category: '',
  //   postImage: '',
  //   likes: 0,
  //   shares: 0,
  // });

  useEffect(() => {
    // getSinglePost('60585a417368f500234b628b')
    //   .then((postInfo) => setPostData(postInfo.data));
    getPosts(1);
  }, []);

  useEffect(() => {
    setCurrentUser(accountData.username);
  }, [auth]);

  return (
    <>
      {currentUser !== ''
      && (
      <div className="dashboard-container">
        <CreatePost
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
            key={post.title + Math.random(0, 10000)}
          />
        ))}
      </div>
      )}
    </>
  );
};

export default Dashboard;
