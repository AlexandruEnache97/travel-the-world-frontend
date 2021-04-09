/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CommentComponent from './CommentComponent';
import Spinner from '../../../../components/Spinner/Spinner';

const CommentList = ({
  currentUser, postUser, postId, comments, totalResults,
  getCommentsFromBackend, deleteComment, currentPage, likedComments,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);

  const getMoreComments = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    const div = document.getElementById(`comment-id-${postId}`);
    const value = div.scrollHeight - 430;

    await getCommentsFromBackend(currentPage + 1, true);
    div.scrollTop = value;
    setLoadingAction(false);
  };

  return (
    <div className="comments-list-container" id={`comment-id-${postId}`}>
      {totalResults > 0 ? comments.map((comment) => {
        let liked = false;
        likedComments.map((item) => {
          if (comment._id === item) { liked = true; }
        });
        return (
          <CommentComponent
            key={Math.random()}
            commentId={comment._id}
            profileImage={comment.userData.profileImage}
            username={comment.userData.username}
            text={comment.text}
            access={comment.userData.username === currentUser}
            deleteComment={deleteComment}
            nrOfLikes={comment.nrOfLikes === undefined ? 0 : comment.nrOfLikes}
            liked={liked}
            createdDate={comment.createdDate}
            postOwner={currentUser === postUser}
            postId={postId}
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
        {totalResults > comments.length
          && (
          <>
            {!loadingAction ? (
              <button type="button" onClick={getMoreComments}>
                Load
                {' '}
                {totalResults - comments.length < 10 ? totalResults - comments.length : 10}
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

export default CommentList;
