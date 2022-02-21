import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateReply from './CreateReply';
import './repliesContainer.scss';
import { getLikedReplies, getReplies } from '../../../../service/repliesApi.ts';
import ReplyList from './ReplyList';

const RepliesContainer = ({ commentId, currentUser, postUser }) => {
  const [replies, setReplies] = useState({
    results: [],
    totalResults: 0,
    currentPage: Number(1),
    likedReplies: [],
  });

  const getRepliesFromBackend = async (page, moreResults) => {
    const reply = await getReplies(commentId, page);
    const { data } = await getLikedReplies(commentId, page);
    if (moreResults) {
      setReplies({
        ...replies,
        results: [...replies.results, ...reply.data.results],
        currentPage: replies.currentPage + 1,
        likedReplies: [...replies.likedReplies, ...data.likedReplies],
      });
    } else {
      setReplies({
        ...replies,
        results: reply.data.results,
        totalResults: reply.data.totalResults,
        currentPage: page,
        likedReplies: data.likedReplies,
      });
    }
  };

  useEffect(() => {
    getRepliesFromBackend(replies.currentPage, false)
      .catch(() => {
        setReplies({
          ...replies,
          totalResults: -1,
        });
      });
  }, [commentId]);

  const updateReplies = () => {
    if (replies.totalResults > 1) {
      getRepliesFromBackend(1, false);
      const div = document.getElementById(`reply-id-${commentId}`);
      div.scrollTop = 0;
    } else {
      setReplies({
        results: [],
        totalResults: -1,
        currentPage: Number(1),
        likedReplies: [],
      });
    }
  };

  return (
    <div className="replies-container">
      <CreateReply commentId={commentId} getRepliesFromBackend={getRepliesFromBackend} />
      {replies !== null && replies.results !== undefined
       && (
       <ReplyList
         currentUser={currentUser}
         postUser={postUser}
         commentId={commentId}
         replies={replies.results}
         totalResults={replies.totalResults}
         likedReplies={replies.likedReplies}
         getRepliesFromBackend={getRepliesFromBackend}
         updateReplies={updateReplies}
         currentPage={replies.currentPage}
       />
       )}
    </div>
  );
};

RepliesContainer.propTypes = {
  commentId: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  postUser: PropTypes.string.isRequired,
};

export default RepliesContainer;
