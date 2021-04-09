/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';
import {
  removeComment, likeComment, unlikeComment, getCommentLikes,
} from '../../../../service/commentsApi';
import Spinner from '../../../../components/Spinner/Spinner';
import EditComment from './EditComment';
import LikesModal from '../likes/LikesModal';
import calculateTimePassed from '../../../../utils/postUtils';

const CommentComponent = ({
  commentId, profileImage, username, text, access,
  deleteComment, nrOfLikes, liked, createdDate,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalText, setOriginalText] = useState(text);
  const [commentLikes, setCommentLikes] = useState(nrOfLikes);
  const [likedComment, setLikedComment] = useState(liked);
  const [likesModal, setLikesModal] = useState(false);

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
    if (likedComment) {
      unlikeComment({ commentId });
      setLikedComment(false);
      setCommentLikes(commentLikes - 1);
    } else {
      likeComment({ commentId });
      setLikedComment(true);
      setCommentLikes(commentLikes + 1);
    }
  };

  const changeLikesModal = () => {
    if (!likesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    setLikesModal(!likesModal);
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={profileImage} alt="profilePic" />
        <p>{username}</p>
      </div>
      <div className="comment-passed-time">
        <p>{calculateTimePassed(createdDate)}</p>
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
        <button type="button" onClick={commentLikes > 0 ? changeLikesModal : () => {}}>
          {commentLikes}
          {' '}
          {commentLikes === 1 ? 'like' : 'likes'}
        </button>
        <button type="button" className={likedComment ? 'liked-comment button-like' : 'button-like'} onClick={handleLiking}>
          {likedComment
            ? <img src="https://img.icons8.com/ios-filled/50/3498DB/facebook-like.png" alt="like" />
            : <img src="https://img.icons8.com/ios-filled/50/666666/facebook-like--v1.png" alt="likeIcon" />}
          <p>Like</p>
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
      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModal
            title="Comment"
            likes={commentLikes}
            postId={commentId}
            closeHandler={changeLikesModal}
            getLikes={getCommentLikes}
          />
        </>
      )}
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
  liked: PropTypes.bool.isRequired,
  createdDate: PropTypes.string.isRequired,
};

export default CommentComponent;
