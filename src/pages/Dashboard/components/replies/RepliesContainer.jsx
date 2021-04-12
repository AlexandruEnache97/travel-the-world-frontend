import React from 'react';
import PropTypes from 'prop-types';
import CreateReply from './CreateReply';
import './repliesContainer.scss';

const RepliesContainer = ({ commentId }) => (
  <div className="replies-container">
    <CreateReply commentId={commentId} />
  </div>
);

RepliesContainer.propTypes = {
  commentId: PropTypes.string.isRequired,
};

export default RepliesContainer;
