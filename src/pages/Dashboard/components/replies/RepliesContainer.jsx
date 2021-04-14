import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateReply from './CreateReply';
import './repliesContainer.scss';
import { getReplies } from '../../../../service/repliesApi';
import ReplyList from './ReplyList';

const RepliesContainer = ({ commentId }) => {
  const [replies, setReplies] = useState({
    results: [],
    totalResults: 0,
    currentPage: Number(1),
    likedComments: [],
  });

  const getRepliesFromBackend = async (page, moreResults) => {
    const reply = await getReplies(commentId, page);
    // const { data } = await getLikedReplies(commentId, page);
    if (moreResults) {
      setReplies({
        ...replies,
        results: [...replies.results, ...reply.data.results],
        currentPage: replies.currentPage + 1,
        // likedComments: [...replies.likedComments, ...data.likedComments],
      });
    } else {
      setReplies({
        ...replies,
        results: reply.data.results,
        totalResults: reply.data.totalResults,
        currentPage: page,
        // likedComments: data.likedComments,
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

  return (
    <div className="replies-container">
      <CreateReply commentId={commentId} getRepliesFromBackend={getRepliesFromBackend} />
      {replies !== null && replies.results !== undefined
       && (
       <ReplyList
        //  currentUser={auth.accountData.username}
        //  postUser={postUser}
         commentId={commentId}
         replies={replies.results}
         totalResults={replies.totalResults}
        //  likedComments={comments.likedComments}
         getCommentsFromBackend={getRepliesFromBackend}
        //  updateComments={updateComments}
         currentPage={replies.currentPage}
       />
       )}
    </div>
  );
};

RepliesContainer.propTypes = {
  commentId: PropTypes.string.isRequired,
};

export default RepliesContainer;
