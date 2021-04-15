/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { editReply } from '../../../../service/repliesApi';

const EditComment = ({
  text, replyId, setEditMode, getEditedText, setLoadingAction,
}) => {
  const [editData, setEditData] = useState({
    text,
    replyId,
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
      await editReply(editData)
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

export default EditComment;
