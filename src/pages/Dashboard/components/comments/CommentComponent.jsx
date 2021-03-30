import React from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';

const CommentComponent = ({
  profileImage, username, text, access,
}) => (
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
      {access && (
        <div className="comment-alter">
          <p>Edit</p>
          <p>Delete</p>
        </div>
      )}
    </div>
  </div>
);

CommentComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  access: PropTypes.bool.isRequired,
};

export default CommentComponent;
