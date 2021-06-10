import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatePost from './CreatePost';
import './postsMenu.scss';

const PostsMenu = ({ createPost, currentUser, createAlert }) => {
  const [createPostModal, setCreatePostModal] = useState(false);

  const createPostHandler = () => {
    setCreatePostModal(!createPostModal);
  };

  return (
    <div className="posts-menu" id="topRef">
      <button className="active-button" type="button">News feed</button>
      <button type="button">Recommended locations</button>
      <button className="create-post-button" type="button" onClick={createPostHandler}>Create new post</button>
      {createPostModal && (
        <>
          <div className="modal" onClickCapture={createPostHandler} />
          <div className="create-post-modal">
            <CreatePost
              createPost={createPost}
              username={currentUser.username}
              profileImage={currentUser.profileImage}
              createAlert={createAlert}
              closeModal={setCreatePostModal}
            />
          </div>
        </>
      )}
    </div>
  );
};

PostsMenu.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  createPost: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default PostsMenu;
