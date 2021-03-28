/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './commentsModal.scss';
import Picker from 'emoji-picker-react';
import { createComment, getComments } from '../../../../service/postsApi';
import CommentList from './CommentList';

const CommentsModal = ({ postId }) => {
  const [commentData, setCommentData] = useState({
    text: '',
    postId: '',
  });
  const [comments, setComments] = useState({
    results: [],
    totalResults: 0,
    currentPage: Number(1),
  });
  const [visibleEmoji, setVisibleEmoji] = useState(false);

  useEffect(async () => {
    setCommentData({
      ...commentData,
      postId,
    });
    try {
      const comm = await getComments(postId, comments.currentPage);
      setComments({
        ...comments,
        results: comm.data.results,
        totalResults: comm.data.totalResults,
      });
    } catch (error) {
      setComments({
        ...comments,
        totalResults: -1,
      });
    }
  }, [postId]);

  const handleOnChange = (e) => {
    setCommentData({
      ...commentData,
      text: e.target.value,
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    setCommentData({
      ...commentData,
      text: commentData.text.concat(emojiObject.emoji),
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setVisibleEmoji(!visibleEmoji);
  };

  const handleOnEnter = async (e) => {
    if (e.key === 'Enter') {
      createComment(commentData);

      const comm = await getComments(postId, 1);
      setComments({
        results: comm.data.results,
        totalResults: comm.data.totalResults,
        currentPage: 1,
      });

      setCommentData({
        ...commentData,
        text: '',
      });
    }
  };

  const getMoreComments = async (e) => {
    e.preventDefault();
    const moreComments = await getComments(postId, comments.currentPage + 1);
    setComments({
      ...comments,
      results: [...comments.results, ...moreComments.data.results],
      currentPage: comments.currentPage + 1,
    });
  };

  return (
    <div className="comments-modal-container">
      <div className="comments-create">
        <textarea
          type="text"
          placeholder="Write a comment..."
          value={commentData.text}
          onChange={handleOnChange}
          onKeyDown={handleOnEnter}
        />
        <button type="button" onClick={handleOnClick}>
          <img src="https://img.icons8.com/android/96/666666/happy.png" alt="emoji" />
        </button>
      </div>
      {comments !== null && comments.results !== undefined
       && (
       <CommentList
         comments={comments.results}
         totalResults={comments.totalResults}
         getMoreComments={getMoreComments}
       />
       )}
      {visibleEmoji && <Picker onEmojiClick={onEmojiClick} />}
    </div>
  );
};

export default CommentsModal;
