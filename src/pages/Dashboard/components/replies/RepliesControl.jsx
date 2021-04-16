import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RepliesControl = ({ deleteCommentReply }) => {
  const [activeDropMenu, setActiveDropMenu] = useState(false);

  const handleDropMenu = (e) => {
    e.preventDefault();
    setActiveDropMenu(!activeDropMenu);
  };

  const deleteReply = () => {
    deleteCommentReply();
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
        <button type="button" onClick={deleteReply}>Delete</button>
        <button type="button">Report</button>
      </div>
      )}
    </div>
  );
};

RepliesControl.propTypes = {
  deleteCommentReply: PropTypes.func.isRequired,
};

export default RepliesControl;
