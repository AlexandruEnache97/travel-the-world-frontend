import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Picker from 'emoji-picker-react';
import { createComment } from '../../../../service/postsApi';

const CreateComment = ({ postId, getCommentsFromBackend }) => {
  const [newComment, setNewComment] = useState({
    text: '',
    postId: '',
  });
  const [visibleEmoji, setVisibleEmoji] = useState(false);

  useEffect(async () => {
    setNewComment({
      ...newComment,
      postId,
    });
  }, [postId]);

  const handleOnChange = (e) => {
    if (e.nativeEvent.inputType !== 'insertLineBreak') {
      setNewComment({
        ...newComment,
        text: e.target.value,
      });
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setNewComment({
      ...newComment,
      text: newComment.text.concat(emojiObject.emoji),
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setVisibleEmoji(!visibleEmoji);
  };

  const handleOnEnter = async (e) => {
    if (e.key === 'Enter') {
      await createComment(newComment);
      getCommentsFromBackend(1, false);

      if (visibleEmoji) setVisibleEmoji(false);

      setNewComment({
        ...newComment,
        text: '',
      });
    }
  };

  return (
    <>
      <div className="comments-create">
        <textarea
          type="text"
          placeholder="Write a comment..."
          value={newComment.text}
          onChange={handleOnChange}
          onKeyDown={handleOnEnter}
        />
        <button type="button" onClick={handleOnClick}>
          <img src="https://img.icons8.com/android/96/666666/happy.png" alt="emoji" />
        </button>
      </div>
      {visibleEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          disableSearchBar
          groupVisibility={{
            flags: false,
          }}
        />
      )}
    </>
  );
};

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  getCommentsFromBackend: PropTypes.func.isRequired,
};

export default CreateComment;
