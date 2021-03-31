/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './commentsModal.scss';
import { getComments } from '../../../../service/postsApi';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const CommentsModal = ({ postId, username }) => {
  const [comments, setComments] = useState({
    results: [],
    totalResults: 0,
    currentPage: Number(1),
  });

  const getCommentsFromBackend = async (page, moreResults) => {
    const comm = await getComments(postId, page);
    if (moreResults) {
      setComments({
        ...comments,
        results: [...comments.results, ...comm.data.results],
        currentPage: comments.currentPage + 1,
      });
    } else {
      setComments({
        ...comments,
        results: comm.data.results,
        totalResults: comm.data.totalResults,
        currentPage: page,
      });
    }
  };

  useEffect(async () => {
    try {
      getCommentsFromBackend(comments.currentPage, false);
    } catch (error) {
      setComments({
        ...comments,
        totalResults: -1,
      });
    }
  }, [postId]);

  const getMoreComments = async (e) => {
    e.preventDefault();

    const div = document.getElementById(`comment-id-${postId}`);
    div.scrollTop = div.scrollHeight - 430;

    getCommentsFromBackend(comments.currentPage + 1, true);
  };

  const updateComments = () => {
    getCommentsFromBackend(1, false);
  };

  return (
    <div className="comments-modal-container">
      <CreateComment
        postId={postId}
        getCommentsFromBackend={getCommentsFromBackend}
      />
      {comments !== null && comments.results !== undefined
       && (
       <CommentList
         username={username}
         postId={postId}
         comments={comments.results}
         totalResults={comments.totalResults}
         getMoreComments={getMoreComments}
         deleteComment={updateComments}
       />
       )}
    </div>
  );
};

export default CommentsModal;
