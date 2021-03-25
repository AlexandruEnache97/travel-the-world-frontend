import React from 'react';
import PropTypes from 'prop-types';

const LikeComponent = ({ profileImage, username }) => (
  <div className="like-container">
    <img src={profileImage} alt="profileImage" />
    <p>{username}</p>
  </div>
);

LikeComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default LikeComponent;
