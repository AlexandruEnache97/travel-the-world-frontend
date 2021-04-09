import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentControl = ({ deletePostComment }) => {
  const [activeDropMenu, setActiveDropMenu] = useState(false);

  const handleDropMenu = (e) => {
    e.preventDefault();
    setActiveDropMenu(!activeDropMenu);
  };

  const deleteComment = () => {
    deletePostComment();
    setActiveDropMenu(false);
  };

  return (
    <div className="control-comment">
      <button
        type="button"
        className="control-button"
        onClick={handleDropMenu}
      >
        ...
      </button>
      {activeDropMenu && (
      <div className="control-menu">
        <button type="button" onClick={deleteComment}>Delete</button>
        <button type="button">Report</button>
      </div>
      )}
    </div>
  );
};

CommentControl.propTypes = {
  deletePostComment: PropTypes.func.isRequired,
};

export default CommentControl;
