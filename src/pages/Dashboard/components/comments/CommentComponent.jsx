/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';
import { likeComment, removeComment } from '../../../../service/postsApi';
import Spinner from '../../../../components/Spinner/Spinner';
import EditComment from './EditComment';

const CommentComponent = ({
  commentId, profileImage, username,
  text, access, deleteComment, nrOfLikes,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalText, setOriginalText] = useState(text);
  const [commentLikes, setCommentLikes] = useState(nrOfLikes);

  const editComm = () => {
    setEditMode(!editMode);
  };

  const getEditedText = (value) => {
    setOriginalText(value);
  };

  const deleteComm = async () => {
    setLoadingAction(true);
    await removeComment({ commentId });
    setLoadingAction(false);
    deleteComment();
  };

  const handleLiking = async (e) => {
    e.preventDefault();
    likeComment({ commentId });
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={profileImage} alt="profilePic" />
        <p>{username}</p>
      </div>
      <div className="comment-content">
        {editMode
          ? (
            <EditComment
              editComm={editComm}
              text={originalText}
              commentId={commentId}
              setEditMode={setEditMode}
              getEditedText={getEditedText}
              setLoadingAction={setLoadingAction}
            />
          ) : <p>{originalText}</p>}
      </div>
      <div className="comment-bottom">
        <button type="button" onClick={handleLiking}>
          {commentLikes}
          {' '}
          {commentLikes === 1 ? 'like' : 'likes'}
        </button>
        <p>Reply</p>
        {access && (
        <div className="comment-alter">
          <button type="button" onClick={editComm}>Edit</button>
          <button type="button" onClick={deleteComm}>Delete</button>
          {loadingAction && <Spinner />}
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
  nrOfLikes: PropTypes.number.isRequired,
};

export default CommentComponent;
