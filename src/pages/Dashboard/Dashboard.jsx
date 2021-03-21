/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import { getSinglePost } from '../../service/postsApi';
import Post from './components/Post';
import CreatePost from './components/CreatePost';

const Dashboard = ({ auth }) => {
  const { accountData, accountId } = auth;
  const [postData, setPostData] = useState({
    accountId: '',
    postId: '',
    title: '',
    text: '',
    location: '',
    category: '',
    postImage: '',
    likes: 0,
    shares: 0,
  });

  useEffect(() => {
    getSinglePost('60570a7dbc55cb0023e249f6')
      .then((postInfo) => setPostData(postInfo.data));
  }, []);

  return (
    <div className="dashboard-container">
      <CreatePost
        accountId={accountId}
        username={accountData.username}
        userIcon="https://img.icons8.com/ios-filled/50/ffffff/cat-profile.png"
      />
      <Post
        username="CatUser"
        title="Black sea"
        text="Wonderful seaside, with great views and nice peoples. The water level has varied significantly over geological time. Due to these variations in the water level in the basin, the surrounding shelf and associated aprons have sometimes been dry land. At certain critical water levels, connections with surrounding water bodies can become established. "
        location="Black Sea, Romania"
        category="Seas"
        image="https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/images%2F24006-black-sea-cruises-constanta-old-casino-700x300.jpg?alt=media&token=cd20b3b3-1a28-4d19-a0a8-9955d53ca242"
        likes={0}
        shares={0}
      />
      <Post
        username="CatUser"
        title="Black sea"
        text="Wonderful seaside, with great views and nice peoples. The water level has varied significantly over geological time. Due to these variations in the water level in the basin, the surrounding shelf and associated aprons have sometimes been dry land. At certain critical water levels, connections with surrounding water bodies can become established. "
        location="Black Sea, Romania"
        category="Seas"
        image="https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/images%2F24006-black-sea-cruises-constanta-old-casino-700x300.jpg?alt=media&token=cd20b3b3-1a28-4d19-a0a8-9955d53ca242"
        likes={0}
        shares={0}
      />
      <Post
        username={postData.accountId}
        title={postData.title}
        text={postData.text}
        location={postData.location}
        category={postData.category}
        likes={postData.likes}
        image={postData.postImage}
        shares={postData.shares}
      />
    </div>
  );
};

export default Dashboard;
