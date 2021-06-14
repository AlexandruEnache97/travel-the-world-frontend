import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './commentsModal.scss';
import { getComments, getLikedComments } from '../../../../service/commentsApi';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const CommentsModal = ({ postId, auth, postUser }) => {
  const [comments, setComments] = useState({
    results: [],
    totalResults: 0,
    currentPage: Number(1),
    likedComments: [],
  });

  const getCommentsFromBackend = async (page, moreResults) => {
    const comm = await getComments(postId, page);
    const { data } = await getLikedComments(postId, page);
    if (moreResults) {
      setComments({
        ...comments,
        results: [...comments.results, ...comm.data.results],
        currentPage: comments.currentPage + 1,
        likedComments: [...comments.likedComments, ...data.likedComments],
      });
    } else {
      setComments({
        ...comments,
        results: comm.data.results,
        totalResults: comm.data.totalResults,
        currentPage: page,
        likedComments: data.likedComments,
      });
    }
  };

  useEffect(() => {
    getCommentsFromBackend(comments.currentPage, false)
      .catch(() => {
        setComments({
          ...comments,
          totalResults: -1,
        });
      });
  }, [postId]);

  const updateComments = () => {
    if (comments.totalResults > 1) {
      getCommentsFromBackend(1, false);
      const div = document.getElementById(`comment-id-${postId}`);
      if (div != null) { div.scrollTop = 0; }
    } else {
      setComments({
        results: [],
        totalResults: -1,
        currentPage: Number(1),
        likedComments: [],
      });
    }
  };

  return (
    <div className="comments-modal-container">
      <CreateComment
        postId={postId}
        getCommentsFromBackend={getCommentsFromBackend}
      />
      {comments !== null && comments.results !== undefined
       && (
       <CommentList
         currentUser={auth.accountData.username}
         postUser={postUser}
         postId={postId}
         comments={comments.results}
         totalResults={comments.totalResults}
         likedComments={comments.likedComments}
         getCommentsFromBackend={getCommentsFromBackend}
         updateComments={updateComments}
         currentPage={comments.currentPage}
       />
       )}
    </div>
  );
};

CommentsModal.propTypes = {
  postId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  postUser: PropTypes.string.isRequired,
};

export default CommentsModal;
