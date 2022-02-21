import * as React from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { createComment } from '../../../../service/commentsApi';

interface Props {
  postId: string,
  getCommentsFromBackend: (page: number, moreResults: boolean) => void
}

const CreateComment: React.FC<Props> = ({ postId, getCommentsFromBackend }) => {
  const [newComment, setNewComment] = React.useState({
    text: '',
    postId: '',
  });
  const [visibleEmoji, setVisibleEmoji] = React.useState(false);

  React.useEffect(() => {
    setNewComment({
      ...newComment,
      postId,
    });
  }, [postId]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //@ts-ignore
    if (e.nativeEvent.inputType !== 'insertLineBreak') { 
      setNewComment({
        ...newComment,
        text: e.target.value,
      });
    }
  };

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setNewComment({
      ...newComment,
      text: newComment.text.concat(emojiObject.emoji),
    });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibleEmoji(!visibleEmoji);
  };

  const handleOnEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        <>
          <div className="emoji-modal" onClickCapture={handleOnClick} />
          <Picker
            onEmojiClick={onEmojiClick}
            disableSearchBar
            groupVisibility={{
              flags: false,
            }}
          />
        </>
      )}
    </>
  );
};

export default CreateComment;
