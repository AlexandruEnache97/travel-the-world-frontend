/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import CommentComponent from './CommentComponent';

const CommentList = ({
  username, postId, comments, totalResults, getMoreComments, deleteComment,
}) => {
  useEffect(() => {
    console.log(totalResults);
  }, [totalResults]);
  return (
    <div className="comments-list-container" id={`comment-id-${postId}`}>
      {totalResults > 0 ? comments.map((comment) => {
        console.log(`${comment.userData.username} ${username}`);
        return (
          <CommentComponent
            key={Math.random()}
            commentId={comment._id}
            profileImage={comment.userData.profileImage}
            username={comment.userData.username}
            text={comment.text}
            access={comment.userData.username === username}
            deleteComment={deleteComment}
          />
        );
      }) : totalResults === 0
      && (
      <div className="comments-loading">
        <span>Loading</span>
        <div className="loading-spinner">
          <div className="loading-icon" data-testid="spinner" />
        </div>
      </div>
      )}
      <div className="comments-more">
        {totalResults > comments.length && (
        <button type="button" onClick={getMoreComments}>
          Load
          {' '}
          {totalResults - comments.length < 10 ? totalResults - comments.length : 10}
          {' more comments'}
        </button>
        )}
      </div>
    </div>
  );
};

export default CommentList;
