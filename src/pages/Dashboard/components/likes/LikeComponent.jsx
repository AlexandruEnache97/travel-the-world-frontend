import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LikeComponent = ({ profileImage, username, userId }) => (
  <Link
    className="like-container"
    to={{
      pathname: `/user/${username}`,
      state: {
        userId,
        username,
        profileImage,
      },
    }}
  >
    <img src={profileImage} alt="profileImage" />
    <p>{username}</p>
  </Link>
);

LikeComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default LikeComponent;
