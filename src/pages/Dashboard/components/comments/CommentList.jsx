import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './CommentComponent';
import Spinner from '../../../../components/Spinner/Spinner';

const CommentList = ({
  currentUser, postUser, postId, comments, totalResults,
  getCommentsFromBackend, updateComments, currentPage, likedComments,
}) => {
  const [loadingAction, setLoadingAction] = useState(false);

  const getMoreComments = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    const div = document.getElementById(`comment-id-${postId}`);
    const value = div.scrollHeight - 430;

    await getCommentsFromBackend(currentPage + 1, true);
    div.scrollTop = value;
    setLoadingAction(false);
  };

  return (
    <div className="comments-list-container" id={`comment-id-${postId}`}>
      {totalResults > 0 ? comments.map((comment) => {
        let liked = false;
        likedComments.map((item) => {
          if (comment._id === item) { liked = true; }
        });
        return (
          <CommentComponent
            key={Math.random()}
            commentData={comment}
            updateComments={updateComments}
            liked={liked}
            postId={postId}
            currentUser={currentUser}
            postUser={postUser}
          />
        );
      }) : totalResults === 0
      && (
      <div className="comments-loading">
        <span>Loading</span>
        <div className="loading-spinner-comments">
          <div className="loading-icon" data-testid="spinner" />
        </div>
      </div>
      )}
      <div className="comments-more">
        {totalResults > comments.length
          && (
          <>
            {!loadingAction ? (
              <button type="button" onClick={getMoreComments}>
                Load
                {' '}
                {totalResults - comments.length < 10 ? totalResults - comments.length : 10}
                {' more comments'}
              </button>
            ) : (
              <div className="load-more-spinner">
                <p>Loading </p>
                <Spinner />
              </div>
            )}
          </>
          )}
      </div>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userData: PropTypes.objectOf(PropTypes.string).isRequired,
      text: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      nrOfLikes: PropTypes.number,
    }).isRequired,
  ).isRequired,
  currentUser: PropTypes.string.isRequired,
  postUser: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  totalResults: PropTypes.number.isRequired,
  getCommentsFromBackend: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  likedComments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentList;
