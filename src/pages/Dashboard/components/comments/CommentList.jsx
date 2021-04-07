/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CommentComponent from './CommentComponent';
import Spinner from '../../../../components/Spinner/Spinner';

const CommentList = ({
  username, postId, comments, totalResults, getCommentsFromBackend, deleteComment, currentPage,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);

  const getMoreComments = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    const div = document.getElementById(`comment-id-${postId}`);
    div.scrollTop = div.scrollHeight - 430;

    await getCommentsFromBackend(currentPage + 1, true);
    setLoadingAction(false);
  };

  return (
    <div className="comments-list-container" id={`comment-id-${postId}`}>
      {totalResults > 0 ? comments.map((comment) => (
        <CommentComponent
          key={Math.random()}
          commentId={comment._id}
          profileImage={comment.userData.profileImage}
          username={comment.userData.username}
          text={comment.text}
          access={comment.userData.username === username}
          deleteComment={deleteComment}
          nrOfLikes={comment.nrOfLikes === undefined ? 0 : comment.nrOfLikes}
        />
      )) : totalResults === 0
      && (
      <div className="comments-loading">
        <span>Loading</span>
        <div className="loading-spinner-comments">
          <div className="loading-icon" data-testid="spinner" />
        </div>
      </div>
      )}
      <div className="comments-more">
        {totalResults > comments.length && (
          <>
            <button type="button" onClick={getMoreComments}>
              Load
              {' '}
              {totalResults - comments.length < 10 ? totalResults - comments.length : 10}
              {' more comments'}
            </button>
            <div className="load-more-spinner">
              {loadingAction && <Spinner />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentList;
