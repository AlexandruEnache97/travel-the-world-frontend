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
  });
  const [visibleEmoji, setVisibleEmoji] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    setCommentData({
      ...commentData,
      postId,
    });
    const comm = await getComments(postId, 1);
    setComments({
      results: comm.data.results,
      totalResults: comm.data.totalResults,
    });
  }, [postId]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

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

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      createComment(commentData);
      setCommentData({
        ...commentData,
        text: '',
      });
    }
  };

  const getMoreComments = async () => {
    const moreComments = await getComments(postId, 2);
    await setComments({
      ...comments,
      results: [...comments.results, ...moreComments.data.results],
    });
  };

  return (
    <div className="comments-modal-container">
      <div className="comments-create">
        <input
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
