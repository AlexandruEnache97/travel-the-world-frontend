import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './postHeader.scss';

const PostHeader = ({ userData }) => {
  const [postSaved, setPostSaved] = useState(false);

  const handleSavePost = () => {
    setPostSaved(!postSaved);
  };

  return (
    <div className="post-top">
      <div className="post-user">
        <img className="post-user-icon" src={userData.profileImage} alt="userIcon" />
        <p>{userData.username}</p>
      </div>
      <button className="bookmark-button" type="button" onClick={handleSavePost}>
        {postSaved ? (
          <img src="https://img.icons8.com/fluent-systems-filled/96/ffffff/bookmark-ribbon.png" alt="save-bookmark" />
        ) : (
          <img src="https://img.icons8.com/fluent-systems-regular/96/ffffff/bookmark-ribbon--v1.png" alt="save-bookmark" />
        )}
      </button>
    </div>
  );
};

PostHeader.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PostHeader;
