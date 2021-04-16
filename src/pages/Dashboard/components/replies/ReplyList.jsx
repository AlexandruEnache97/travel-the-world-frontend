/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Spinner from '../../../../components/Spinner/Spinner';
import ReplyComponent from './ReplyComponent';

const ReplyList = ({
  replyId, replies, totalResults, getRepliesFromBackend, currentPage,
  likedReplies, currentUser, postUser, updateReplies,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);

  const getMoreComments = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    const div = document.getElementById(`reply-id-${replyId}`);
    const value = div.scrollHeight - 430;

    await getRepliesFromBackend(currentPage + 1, true);
    div.scrollTop = value;
    setLoadingAction(false);
  };

  return (
    <div className="reply-list-container" id={`reply-id-${replyId}`}>
      {totalResults > 0 ? replies.map((reply) => {
        let liked = false;
        likedReplies.map((item) => {
          if (reply._id === item) { liked = true; }
        });
        return (
          <ReplyComponent
            key={Math.random()}
            replyData={reply}
            liked={liked}
            access={reply.userData.username === currentUser}
            postUser={postUser}
            updateReplies={updateReplies}
            postOwner={currentUser === postUser}
          />
        );
      }) : totalResults === 0
      && (
      <div className="comments-loading">
        <span>Loading</span>
        <div className="loading-spinner-comments">
          <div className="loading-icon" data-testid="spinner" />
        </div>
      </div>
      )}
      <div className="comments-more">
        {totalResults > replies.length
          && (
          <>
            {!loadingAction ? (
              <button type="button" onClick={getMoreComments}>
                Load
                {' '}
                {totalResults - replies.length < 10 ? totalResults - replies.length : 10}
                {' more comments'}
              </button>
            ) : (
              <div className="load-more-spinner">
                <p>Loading </p>
                <Spinner />
              </div>
            )}
          </>
          )}
      </div>
    </div>
  );
};

export default ReplyList;
