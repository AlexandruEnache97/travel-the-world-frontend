import * as React from 'react';
import { editComment } from '../../../../service/commentsApi';

interface Props {
  text: string,
  commentId: string,
  setEditMode: (isEditMode: boolean) => void, 
  getEditedText: (text: string) => void, 
  setLoadingAction: (isLoading: boolean) => void
}

const EditComment: React.FC<Props> = ({
  text, commentId, setEditMode, getEditedText, setLoadingAction,
}) => {
  const [editData, setEditData] = React.useState({
    text,
    commentId,
  });

  const editOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //@ts-ignore
    if (e.nativeEvent.inputType !== 'insertLineBreak') {
      setEditData({
        ...editData,
        text: e.target.value,
      });
    }
  };

  const editOnEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      value={editData.text}
      onChange={editOnChange}
      onKeyDown={editOnEnter}
    />
  );
};

export default EditComment;
