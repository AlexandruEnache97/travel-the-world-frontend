/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import calculateTimePassed from '../../../../utils/postUtils';
import { likeReply, unlikeReply } from '../../../../service/repliesApi';

const ReplyComponent = ({ replyData, liked }) => {
  const [replyLikes, setReplyLikes] = useState({
    nrOfLikes: replyData.nrOfLikes === undefined ? 0 : replyData.nrOfLikes,
    liked,
  });

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
        <p>{replyData.text}</p>
      </div>
      <div className="comment-bottom">
        <button
          type="button"
          // onClick={replyLikes.nrOfLikes > 0 ? changeLikesModal : () => {}}
        >
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
        {/* <button type="button" onClick={handleReplyModal}>Reply</button>
        {access && (
        <div className="comment-alter">
          <button type="button" onClick={editCommentHandler}>Edit</button>
          <button type="button" onClick={deleteComm}>Delete</button>
        </div>
        )}
        {loadingAction && <Spinner />} */}
      </div>
    </div>
  );
};

export default ReplyComponent;
