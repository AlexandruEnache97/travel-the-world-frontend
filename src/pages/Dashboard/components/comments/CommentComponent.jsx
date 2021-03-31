import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';
import { removeComment } from '../../../../service/postsApi';
import Spinner from '../../../../components/Spinner/Spinner';

const CommentComponent = ({
  commentId, profileImage, username, text, access, deleteComment,
}) => {
  const [deleteResponse, setDeleteResponse] = useState(false);
  const deleteComm = async () => {
    setDeleteResponse(true);
    await removeComment({ commentId });
    setDeleteResponse(false);
    deleteComment();
  };

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
        {access && (
        <div className="comment-alter">
          <p>Edit</p>
          <button type="button" onClick={deleteComm}>Delete</button>
          {deleteResponse && <Spinner />}
        </div>
        )}
      </div>
    </div>
  );
};

CommentComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  access: PropTypes.bool.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentComponent;
