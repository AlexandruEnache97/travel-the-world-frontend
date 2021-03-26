import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentsModal.scss';

const CommentsModal = ({ postId }) => {
  const [commentInput, setCommentInput] = useState('');

  const handleOnChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      console.log(`${commentInput} ${postId}`);
      setCommentInput('');
    }
  };

  return (
    <div className="comments-modal-container">
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentInput}
        onChange={handleOnChange}
        onKeyDown={handleOnEnter}
      />
    </div>
  );
};

CommentsModal.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentsModal;
