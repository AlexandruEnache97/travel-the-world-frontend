import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { editComment } from '../../../../service/commentsApi';

const EditComment = ({
  text, commentId, setEditMode, getEditedText, setLoadingAction,
}) => {
  const [editData, setEditData] = useState({
    text,
    commentId,
  });

  const editOnChange = (e) => {
    if (e.nativeEvent.inputType !== 'insertLineBreak') {
      setEditData({
        ...editData,
        text: e.target.value,
      });
    }
  };

  const editOnEnter = async (e) => {
    if (e.key === 'Enter') {
      setLoadingAction(true);
      await editComment(editData)
        .then(() => {
          setLoadingAction(false);
          getEditedText(editData.text);
          setEditMode(false);
        });
    } else if (e.key === 'Escape') {
      setEditMode(false);
    }
  };

  return (
    <textarea
      type="text"
      value={editData.text}
      onChange={editOnChange}
      onKeyDown={editOnEnter}
    />
  );
};

EditComment.propTypes = {
  text: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  setEditMode: PropTypes.func.isRequired,
  getEditedText: PropTypes.func.isRequired,
  setLoadingAction: PropTypes.func.isRequired,
};

export default EditComment;
