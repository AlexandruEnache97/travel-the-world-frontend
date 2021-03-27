/* eslint-disable react/prop-types */
import React from 'react';
import CommentComponent from './CommentComponent';

const CommentList = ({ comments, totalResults, getMoreComments }) => (
  <div className="comments-list-container">
    {comments.length > 0 ? comments.map((comment) => (
      <CommentComponent
        key={Math.random()}
        profileImage={comment.userData[0].profileImage}
        username={comment.userData[0].username}
        text={comment.text}
      />
    )) : <h1>Loading...</h1>}
    <div className="comments-more">
      {totalResults > comments.length
      && (
      <button type="button" onClick={getMoreComments}>
        Load
        {' '}
        {totalResults - comments.length}
        {' more comments'}
      </button>
      )}
    </div>
  </div>
);

export default CommentList;
