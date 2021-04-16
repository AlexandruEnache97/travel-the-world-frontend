/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import calculateTimePassed from '../../../../utils/postUtils';
import {
  likeReply, unlikeReply, getReplyLikes, removeReply,
} from '../../../../service/repliesApi';
import LikesModal from '../likes/LikesModal';
import EditReply from './EditReply';
import Spinner from '../../../../components/Spinner/Spinner';

const ReplyComponent = ({
  replyData, liked, access, updateReplies,
}) => {
  const [replyLikes, setReplyLikes] = useState({
    nrOfLikes: replyData.nrOfLikes === undefined ? 0 : replyData.nrOfLikes,
    liked,
  });
  const [likesModal, setLikesModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalText, setOriginalText] = useState(replyData.text);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleLiking = async (e) => {
    e.preventDefault();
    if (replyLikes.liked) {
      unlikeReply({ replyId: replyData._id });
      setReplyLikes({
        nrOfLikes: replyLikes.nrOfLikes - 1,
        liked: false,
      });
    } else {
      likeReply({ replyId: replyData._id });
      setReplyLikes({
        nrOfLikes: replyLikes.nrOfLikes + 1,
        liked: true,
      });
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

  const editReplyHandler = () => {
    setEditMode(!editMode);
  };

  const getEditedText = (value) => {
    setOriginalText(value);
  };

  const deleteReply = async () => {
    setLoadingAction(true);
    await removeReply({ replyId: replyData._id });
    setLoadingAction(false);
    updateReplies();
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={replyData.userData.profileImage} alt="profilePic" />
        <p>{replyData.userData.username}</p>
      </div>
      <div className="comment-passed-time">
        <p>{calculateTimePassed(replyData.createdDate)}</p>
      </div>
      <div className="comment-content">
        {editMode
          ? (
            <EditReply
              text={originalText}
              replyId={replyData._id}
              setEditMode={setEditMode}
              getEditedText={getEditedText}
              setLoadingAction={setLoadingAction}
            />
          ) : <p>{originalText}</p>}
      </div>
      <div className="comment-bottom">
        <button type="button" onClick={replyLikes.nrOfLikes > 0 ? changeLikesModal : () => {}}>
          {replyLikes.nrOfLikes}
          {' '}
          {replyLikes.nrOfLikes === 1 ? 'like' : 'likes'}
        </button>
        <button type="button" className={replyLikes.liked ? 'liked-comment button-like' : 'button-like'} onClick={handleLiking}>
          {replyLikes.liked
            ? <img src="https://img.icons8.com/ios-filled/50/3498DB/facebook-like.png" alt="like" />
            : <img src="https://img.icons8.com/ios-filled/50/666666/facebook-like--v1.png" alt="likeIcon" />}
          <p>Like</p>
        </button>
        {access && (
        <div className="comment-alter">
          <button type="button" onClick={editReplyHandler}>Edit</button>
          <button type="button" onClick={deleteReply}>Delete</button>
        </div>
        )}
        {loadingAction && <Spinner />}
      </div>
      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModal
            title="Comment"
            likes={replyLikes.nrOfLikes}
            postId={replyData._id}
            closeHandler={changeLikesModal}
            getLikes={getReplyLikes}
          />
        </>
      )}
    </div>
  );
};

export default ReplyComponent;
