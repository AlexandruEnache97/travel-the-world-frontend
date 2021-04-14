/* eslint-disable react/prop-types */
import React from 'react';
import calculateTimePassed from '../../../../utils/postUtils';

const ReplyComponent = ({ replyData }) => (
  <div className="comment-container">
    <div className="comment-top">
      <img src={replyData.userData.profileImage} alt="profilePic" />
      <p>{replyData.userData.username}</p>
    </div>
    <div className="comment-passed-time">
      <p>{calculateTimePassed(replyData.createdDate)}</p>
    </div>
    <div className="comment-content">
      <p>{replyData.text}</p>
    </div>
  </div>
);

export default ReplyComponent;
