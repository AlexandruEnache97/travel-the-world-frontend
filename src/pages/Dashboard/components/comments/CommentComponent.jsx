import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';
import {
  removeComment, removePostComment, likeComment,
  unlikeComment, getCommentLikes,
} from '../../../../service/commentsApi';
import Spinner from '../../../../components/Spinner/Spinner';
import EditComment from './EditComment';
import LikesModalComponent from '../likes/LikesModal';
import calculateTimePassed from '../../../../utils/postUtils';
import CommentControl from './CommentControl';
import RepliesContainer from '../replies/RepliesContainer';

const CommentComponent = ({
  commentData, updateComments, liked, postId,
  currentUser, postUser,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalText, setOriginalText] = useState(commentData.text);
  const [commentLikes, setCommentLikes] = useState({
    nrOfLikes: commentData.nrOfLikes === undefined ? 0 : commentData.nrOfLikes,
    liked,
  });
  const [likesModal, setLikesModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);

  const editCommentHandler = () => {
    setEditMode(!editMode);
  };

  const getEditedText = (value) => {
    setOriginalText(value);
  };

  const deleteComm = async () => {
    setLoadingAction(true);
    await removeComment({ commentId: commentData._id });
    setLoadingAction(false);
    updateComments();
  };

  const deletePostComment = async () => {
    setLoadingAction(true);
    await removePostComment({ commentId: commentData._id, postId });
    setLoadingAction(false);
    updateComments();
  };

  const handleLiking = async (e) => {
    e.preventDefault();
    if (commentLikes.liked) {
      unlikeComment({ commentId: commentData._id });
      setCommentLikes({
        nrOfLikes: commentLikes.nrOfLikes - 1,
        liked: false,
      });
    } else {
      likeComment({ commentId: commentData._id });
      setCommentLikes({
        nrOfLikes: commentLikes.nrOfLikes + 1,
        liked: true,
      });
    }
  };

  const changeLikesModal = () => {
    if (!likesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    setLikesModal(!likesModal);
  };

  const handleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={commentData.userData.profileImage} alt="profilePic" />
        <p>{commentData.userData.username}</p>
      </div>
      <div className="comment-passed-time">
        <p>{calculateTimePassed(commentData.createdDate)}</p>
      </div>
      <div className="comment-content">
        {editMode
          ? (
            <EditComment
              text={originalText}
              commentId={commentData._id}
              setEditMode={setEditMode}
              getEditedText={getEditedText}
              setLoadingAction={setLoadingAction}
            />
          ) : <p>{originalText}</p>}
      </div>
      <div className="comment-bottom">
        <button type="button" className={commentLikes.liked ? 'liked-comment button-like' : 'button-like'} onClick={handleLiking}>
          {commentLikes.liked
            ? <img src="https://img.icons8.com/ios-filled/50/3498DB/facebook-like.png" alt="like" />
            : <img src="https://img.icons8.com/ios-filled/50/666666/facebook-like--v1.png" alt="likeIcon" />}
          <p>Like</p>
        </button>
        <button type="button" onClick={handleReplyModal}>Reply</button>
        {commentData.userData.username === currentUser && (
          <div className="comment-alter">
            <button type="button" onClick={editCommentHandler}>Edit</button>
            <button type="button" onClick={deleteComm}>Delete</button>
          </div>
        )}
        {loadingAction && <Spinner />}
        <button className="display-likes" type="button" onClick={commentLikes.nrOfLikes > 0 ? changeLikesModal : () => { }}>
          {commentLikes.nrOfLikes}
          {' '}
          <img src="https://img.icons8.com/ios-filled/50/3498DB/facebook-like.png" alt="like" />
        </button>
      </div>
      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModalComponent
            title="Comment"
            likes={commentLikes.nrOfLikes}
            postId={commentData._id}
            closeHandler={changeLikesModal}
            getLikes={getCommentLikes}
          />
        </>
      )}
      {currentUser === postUser && (
        <CommentControl deletePostComment={deletePostComment} />
      )}
      {replyModal && (
        <RepliesContainer
          commentId={commentData._id}
          currentUser={currentUser}
          postUser={postUser}
        />
      )}
    </div>
  );
};

CommentComponent.propTypes = {
  commentData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    nrOfLikes: PropTypes.number,
  }).isRequired,
  updateComments: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  postUser: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default CommentComponent;
