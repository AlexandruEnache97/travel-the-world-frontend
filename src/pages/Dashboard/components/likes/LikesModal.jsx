import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './likesModal.scss';
import LikeComponent from './LikeComponent';

const LikesModal = ({
  title, likes, postId, closeHandler, getLikes,
}) => {
  const [userLikes, setUserLikes] = useState({
    likes: [],
    currentPage: 1,
  });

  useEffect(async () => {
    const info = await getLikes(postId, userLikes.currentPage);
    setUserLikes({
      ...userLikes,
      likes: info.data.userLikes,
    });
  }, []);

  const getMoreLikes = async (e) => {
    e.preventDefault();

    const div = document.getElementById('likes-id');
    div.scrollTop = div.scrollHeight - 285;

    const info = await getLikes(postId, userLikes.currentPage + 1);
    setUserLikes({
      likes: [...userLikes.likes, ...info.data.userLikes],
      currentPage: userLikes.currentPage + 1,
    });
  };

  return (
    <div className="likes-modal-container">
      <div className="modal-top">
        <p>
          {title}
          {' '}
          -
          {' '}
          {}
          {' '}
          {likes}
          {' '}
          {likes === 1 ? 'like' : 'likes'}
        </p>
        <button type="button" onClick={closeHandler}>x</button>
      </div>
      <div className="modal-content" id="likes-id">
        {userLikes.likes.length === 0 ? (
          <div className="like-container">
            <span>Loading</span>
            <div className="loading-spinner">
              <div className="loading-icon" data-testid="spinner" />
            </div>
          </div>
        )
          : userLikes.likes.map((item) => (
            <LikeComponent
              profileImage={item.profileImage}
              username={item.username}
              key={Math.random()}
            />
          ))}

        <div className="more-likes">
          {userLikes.likes.length !== 0 && likes > userLikes.likes.length && (
          <button type="button" onClick={getMoreLikes}>
            Load
            {' '}
            {likes - userLikes.likes.length > 10 ? 10 : likes - userLikes.likes.length}
            {' more likes'}
          </button>
          )}
        </div>
      </div>
      <div className="modal-bottom" />
    </div>
  );
};

LikesModal.propTypes = {
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  getLikes: PropTypes.func.isRequired,
};

export default LikesModal;
