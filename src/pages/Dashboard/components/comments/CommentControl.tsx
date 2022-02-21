import * as React from 'react';

interface Props {
  deletePostComment: () => void
}

const CommentControl: React.FC<Props> = ({ deletePostComment }) => {
  const [activeDropMenu, setActiveDropMenu] = React.useState(false);

  const handleDropMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
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

export default CommentControl;
