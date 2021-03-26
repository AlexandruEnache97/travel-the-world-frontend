import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './commentsModal.scss';
import { createComment } from '../../../../service/postsApi';

const CommentsModal = ({ postId }) => {
  const [commentData, setCommentData] = useState({
    text: '',
    postId: '',
  });

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
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentData.text}
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
