import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './likesModal.scss';
import LikeComponent from './LikeComponent';
import { getUserLikes } from '../../../service/postsApi';

const LikesModal = ({ postId, closeHandler }) => {
  const [userLikes, setUserLikes] = useState([]);
  useEffect(async () => {
    const info = await getUserLikes(postId);
    setUserLikes(info.data.userLikes);
  }, []);

  return (
    <div className="likes-modal-container">
      <div className="modal-top">
        <p>Title</p>
        <button type="button" onClick={closeHandler}>x</button>
      </div>
      <div className="modal-content">
        {userLikes.length === 0 ? (
          <div className="like-container">
            <span>Loading</span>
            <div className="loading-spinner">
              <div className="loading-icon" data-testid="spinner" />
            </div>
          </div>
        )
          : userLikes.map((item) => (
            <LikeComponent
              profileImage={item.profileImage}
              username={item.username}
              key={Math.random()}
            />
          ))}
      </div>
      <div className="modal-bottom" />
    </div>
  );
};

LikesModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default LikesModal;
