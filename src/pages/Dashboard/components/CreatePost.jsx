import React from 'react';
import PropTypes from 'prop-types';
import './createPost.scss';

const CreatePost = ({ username, userIcon }) => {
  CreatePost.propTypes = {
    username: PropTypes.string.isRequired,
    userIcon: PropTypes.string.isRequired,
  };

  return (
    <div className="create-container">
      <div className="create-top">
        <div className="top-user">
          <img src={userIcon} alt="userIcon" />
          <p>{username}</p>
        </div>
        <p>Create post</p>
      </div>
      <div className="create-content">
        <label htmlFor="titlePost">Post title</label>
        <input type="text" id="titlePost" placeholder="Your post title" />

        <label htmlFor="textPost">Post description</label>
        <textarea id="textPost" placeholder="Your post content" resize="none" />

        <label htmlFor="categoryPost">Post category</label>
        <input type="text" id="categoryPost" placeholder="Your post category" />

        <label htmlFor="locationPost">Post location</label>
        <input type="text" id="locationPost" placeholder="Your post location" />
      </div>
      <div className="create-upload">
        <label htmlFor="uploadImage">Upload image (not required)</label>
        <input type="file" className="input-upload" />
      </div>
      <div className="create-bottom">
        <button type="button">
          <img src="https://img.icons8.com/pastel-glyph/64/ffffff/create-new--v3.png" alt="createPost" />
          <p>Create Post</p>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
