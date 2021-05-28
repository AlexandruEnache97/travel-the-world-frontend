import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PostsMenu from './PostsMenu';
import ListPosts from './ListPost';
import './postsContainer.scss';

const PostsContainer = ({
  currentUser, posts, getPosts,
  createPost, getLikedPosts, createAlert,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts(currentPage);
    getLikedPosts(currentPage);
  }, []);

  const getMorePosts = () => {
    getPosts(currentPage + 1);
    getLikedPosts(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="feed-container">
      <PostsMenu
        currentUser={currentUser}
        createPost={createPost}
        createAlert={createAlert}
      />
      <ListPosts
        posts={posts.currentPosts}
        likedPosts={posts.likedPosts}
        currentPage={currentPage}
        hasMore={posts.totalResults > currentPage * 10}
        getMorePosts={getMorePosts}
        createAlert={createAlert}
      />
    </div>
  );
};

PostsContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  getLikedPosts: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  posts: PropTypes.shape({
    currentPosts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userData: PropTypes.objectOf(PropTypes.string).isRequired,
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
};

export default PostsContainer;
