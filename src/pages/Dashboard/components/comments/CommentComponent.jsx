import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';

const CommentComponent = ({ profileImage, username, text }) => {
  useEffect(() => {
    console.log('username');
  }, []);
  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={profileImage} alt="profilePic" />
        <p>{username}</p>
      </div>
      <div className="comment-content">
        <p>{text}</p>
      </div>
      <div className="comment-bottom">
        <p>0 likes</p>
        <p>Reply</p>
      </div>
    </div>
  );
};

CommentComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommentComponent;
