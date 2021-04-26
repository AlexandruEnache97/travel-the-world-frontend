import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Dashboard/components/Navbar';
import './profilePage.scss';
import backgroundGradient from '../../images/BackgroundGradient.svg';
import ListPosts from '../Dashboard/components/posts/ListPosts';
import { getUserPosts, getUserLikedPosts } from '../../service/postsApi';

const ProfilePage = ({ /* auth, */ signOut }) => {
  // const { accountData } = auth;
  const [userPosts, setUserPosts] = useState([]);
  const [likedUserPosts, setLikedUserPosts] = useState([]);

  useEffect(async () => {
    const { data } = await getUserPosts(1);
    const likedPosts = await getUserLikedPosts(1);
    setUserPosts(data.posts);
    setLikedUserPosts(likedPosts.data.likedPosts);
  }, []);

  return (
    <div className="profile-page">
      <Navbar signOut={signOut} />
      <div className="profile-container">
        <ListPosts
          posts={userPosts}
          likedPosts={likedUserPosts}
        />
      </div>
      <img className="profile-background" src={backgroundGradient} alt="profileGradient" />
    </div>
  );
};

ProfilePage.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default ProfilePage;
