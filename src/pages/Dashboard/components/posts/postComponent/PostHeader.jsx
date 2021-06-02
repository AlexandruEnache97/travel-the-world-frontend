import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './postHeader.scss';
import { deleteSavedPost, savePost } from '../../../../../service/savePostsApi';

const PostHeader = ({
  postId, userData, saved, createAlert,
}) => {
  const [postSaved, setPostSaved] = useState(saved);

  const handleSavePost = () => {
    setPostSaved(!postSaved);
    if (!postSaved) {
      savePost(postId);
      createAlert('Post saved', 3);
    } else {
      deleteSavedPost(postId);
      createAlert('Post unsaved', 3);
    }
  };

  return (
    <div className="post-top">
      <div className="post-user">
        <img className="post-user-icon" src={userData.profileImage} alt="userIcon" />
        <p>{userData.username}</p>
      </div>
      <button className="bookmark-button" type="button" onClick={handleSavePost}>
        {postSaved ? (
          <img src="https://img.icons8.com/fluent-systems-filled/96/ffffff/bookmark-ribbon.png" alt="saved-bookmark" />
        ) : (
          <img src="https://img.icons8.com/fluent-systems-regular/96/ffffff/bookmark-ribbon--v1.png" alt="bookmark" />
        )}
      </button>
    </div>
  );
};

PostHeader.propTypes = {
  postId: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.string).isRequired,
  saved: PropTypes.bool,
  createAlert: PropTypes.func.isRequired,
};

PostHeader.defaultProps = {
  saved: false,
};

export default PostHeader;
