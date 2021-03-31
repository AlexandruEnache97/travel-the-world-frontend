import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './commentComponent.scss';
import { removeComment, editComment } from '../../../../service/postsApi';
import Spinner from '../../../../components/Spinner/Spinner';

const CommentComponent = ({
  commentId, profileImage, username, text, access, deleteComment,
}) => {
  const [deleteResponse, setDeleteResponse] = useState(false);
  const [editData, setEditData] = useState({
    value: text,
    text,
    commentId,
  });
  const [editMode, setEditMode] = useState(false);

  const editComm = () => {
    if (!editMode) {
      setEditData({
        ...editData,
        text: editData.value,
      });
    }
    setEditMode(!editMode);
  };

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
      setDeleteResponse(true);
      await editComment(editData)
        .then(() => {
          setEditData({
            ...editData,
            value: editData.text,
          });

          setDeleteResponse(false);
          setEditMode(false);
        });
    } else if (e.key === 'Escape') {
      setEditMode(false);
    }
  };

  const deleteComm = async () => {
    setDeleteResponse(true);
    await removeComment({ commentId });
    setDeleteResponse(false);
    deleteComment();
  };

  return (
    <div className="comment-container">
      <div className="comment-top">
        <img src={profileImage} alt="profilePic" />
        <p>{username}</p>
      </div>
      <div className="comment-content">
        {editMode
          ? (
            <textarea
              type="text"
              value={editData.text}
              onChange={editOnChange}
              onKeyDown={editOnEnter}
            />
          ) : <p>{editData.value}</p>}
      </div>
      <div className="comment-bottom">
        <p>0 likes</p>
        <p>Reply</p>
        {access && (
        <div className="comment-alter">
          <button type="button" onClick={editComm}>Edit</button>
          <button type="button" onClick={deleteComm}>Delete</button>
          {deleteResponse && <Spinner />}
        </div>
        )}
      </div>
    </div>
  );
};

CommentComponent.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  access: PropTypes.bool.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentComponent;
