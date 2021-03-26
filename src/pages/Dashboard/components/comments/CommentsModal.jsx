import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './commentsModal.scss';
import Picker from 'emoji-picker-react';
import { createComment } from '../../../../service/postsApi';

const CommentsModal = ({ postId }) => {
  const [commentData, setCommentData] = useState({
    text: '',
    postId: '',
  });
  const [visibleEmoji, setVisibleEmoji] = useState(false);

  useEffect(() => {
    setCommentData({
      ...commentData,
      postId,
    });
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

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      createComment(commentData);
      setCommentData({
        ...commentData,
        text: '',
      });
    }
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
        <button type="button" onClick={handleOnClick}>&#x1F600;</button>
      </div>
      {visibleEmoji && <Picker onEmojiClick={onEmojiClick} />}
    </div>
  );
};

CommentsModal.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentsModal;
