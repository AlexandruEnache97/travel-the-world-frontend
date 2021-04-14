import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Picker from 'emoji-picker-react';
import './createReply.scss';
import { createReply } from '../../../../service/repliesApi';

const CreateReply = ({ commentId, getRepliesFromBackend }) => {
  const [newReply, setNewReply] = useState({
    text: '',
    commentId: '',
  });
  const [visibleEmoji, setVisibleEmoji] = useState(false);

  useEffect(async () => {
    setNewReply({
      ...newReply,
      commentId,
    });
  }, [commentId]);

  const handleOnChange = (e) => {
    if (e.nativeEvent.inputType !== 'insertLineBreak') {
      setNewReply({
        ...newReply,
        text: e.target.value,
      });
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setNewReply({
      ...newReply,
      text: newReply.text.concat(emojiObject.emoji),
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setVisibleEmoji(!visibleEmoji);
  };

  const handleOnEnter = async (e) => {
    if (e.key === 'Enter') {
      await createReply(newReply);
      getRepliesFromBackend(1, false);

      if (visibleEmoji) setVisibleEmoji(false);

      setNewReply({
        ...newReply,
        text: '',
      });
    }
  };

  return (
    <>
      <div className="reply-create">
        <textarea
          type="text"
          placeholder="Write a reply..."
          value={newReply.text}
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

CreateReply.propTypes = {
  commentId: PropTypes.string.isRequired,
  getRepliesFromBackend: PropTypes.func.isRequired,
};

export default CreateReply;
