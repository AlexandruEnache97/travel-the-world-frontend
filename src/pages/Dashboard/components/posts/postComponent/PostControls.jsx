import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserLikes, likePost, unlikePost } from '../../../../../service/postsApi';
import LikesModal from '../../likes/LikesModal';
import CommentsModal from '../../comments/ConnectedCommentsModal';
import './postControls.scss';

const PostControls = ({
  id, likes, shares, liked, createAlert, username, title,
}) => {
  const [likePostData, setLikePostData] = useState({
    nrOfLikes: 0,
    liked: false,
  });
  const [likesModal, setLikesModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);

  useEffect(() => {
    setLikePostData({
      nrOfLikes: likes,
      liked,
    });
  }, [likes]);

  const changeLikesModal = () => {
    if (!likesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    setLikesModal(!likesModal);
  };

  const handleLikePost = (e) => {
    e.preventDefault();
    if (likePostData.liked) {
      setLikePostData({
        nrOfLikes: likePostData.nrOfLikes -= 1,
        liked: false,
      });
      unlikePost({ postId: id });
      createAlert('Post unlike', 3);
    } else {
      setLikePostData({
        nrOfLikes: likePostData.nrOfLikes += 1,
        liked: true,
      });
      likePost({ postId: id });
      createAlert('Post liked', 3);
    }
  };

  const changeCommentsModal = () => {
    setCommentsModal(!commentsModal);
  };

  return (
    <div className="post-bottom">
      <div className="post-bottom-text">
        <button type="button" onClick={likePostData.nrOfLikes > 0 ? changeLikesModal : () => { }}>
          {likePostData.nrOfLikes}
          {' '}
          {likePostData.nrOfLikes === 1 ? 'like' : 'likes'}
        </button>
        <p>
          {shares}
          {' '}
          shares
        </p>
      </div>
      <div className="post-functions">
        <div className="post-bottom-buttons">
          <button type="button" onClick={handleLikePost}>
            {likePostData.liked ? <img src="https://img.icons8.com/ios-filled/100/ffffff/facebook-like.png" alt="likeIcon" />
              : <img src="https://img.icons8.com/ios/50/ffffff/facebook-like--v1.png" alt="likeIcon" />}
          </button>
          <button type="button" onClick={changeCommentsModal}>
            <img src="https://img.icons8.com/fluent-systems-regular/48/ffffff/topic.png" alt="commentsIcon" />
          </button>
          <button type="button">
            <img src="https://img.icons8.com/windows/64/ffffff/share-3.png" alt="shareIcon" />
          </button>
        </div>
        {commentsModal
          && (
            <CommentsModal
              postId={id}
              postUser={username}
            />
          )}
      </div>

      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModal
            title={title}
            likes={likePostData.nrOfLikes}
            postId={id}
            closeHandler={changeLikesModal}
            getLikes={getUserLikes}
          />
        </>
      )}
    </div>
  );
};

PostControls.propTypes = {
  id: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired,
  liked: PropTypes.bool,
  createAlert: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

PostControls.defaultProps = {
  liked: false,
};

export default PostControls;
