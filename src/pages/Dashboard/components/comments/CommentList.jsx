/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import CommentComponent from './CommentComponent';

const CommentList = ({ comments, totalResults, getMoreComments }) => {
  useEffect(() => {
    console.log(totalResults);
  }, [totalResults]);
  return (
    <div className="comments-list-container">
      {totalResults > 0 ? comments.map((comment) => (
        <CommentComponent
          key={Math.random()}
          profileImage={comment.userData[0].profileImage}
          username={comment.userData[0].username}
          text={comment.text}
        />
      )) : totalResults === 0
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
