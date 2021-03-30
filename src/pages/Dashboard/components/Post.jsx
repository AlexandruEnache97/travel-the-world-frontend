import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import calculateTimePassed from '../../../utils/postUtils';
import './post.scss';
import { likePost, unlikePost } from '../../../service/postsApi';
import LikesModal from './likes/LikesModal';
import CommentsModal from './comments/CommentsModal';

const Post = ({
  postId, username, title, text, image,
  category, location, likes, shares, createdDate, liked,
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
  }, []);

  const changeLikesModal = () => {
    if (!likesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    setLikesModal(!likesModal);
  };

  const changeCommentsModal = () => {
    setCommentsModal(!commentsModal);
  };

  const handleLikePost = (e) => {
    e.preventDefault();
    if (likePostData.liked) {
      setLikePostData({
        nrOfLikes: likePostData.nrOfLikes -= 1,
        liked: false,
      });
      unlikePost({ postId });
    } else {
      setLikePostData({
        nrOfLikes: likePostData.nrOfLikes += 1,
        liked: true,
      });
      likePost({ postId });
    }
  };

  return (
    <div className="post-container">
      <div className="post-top">
        <img className="post-user-icon" src="https://img.icons8.com/ios-filled/50/ffffff/cat-profile.png" alt="userIcon" />
        <p>{username}</p>
      </div>
      <div className="post-content">
        <h1>{title}</h1>
        <div className="post-location">
          <div className="location-text">
            <img src="https://img.icons8.com/material/24/000000/worldwide-location--v1.png" alt="locationIcon" />
            <p>{location}</p>
          </div>
          <div className="category-text">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/category.png" alt="categoryIcon" />
            <p>{category}</p>
          </div>
        </div>
        <p>{calculateTimePassed(createdDate)}</p>
        <p>{text}</p>
        {image !== '' && <img className="post-image" src={image} alt="postImage" />}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-text">
          <button type="button" onClick={likePostData.nrOfLikes > 0 ? changeLikesModal : () => {}}>
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
              {likePostData.liked ? <img src="https://img.icons8.com/ios-filled/100/ffffff/facebook-like.png" alt="like" />
                : <img src="https://img.icons8.com/ios/50/ffffff/facebook-like--v1.png" alt="likeIcon" />}
            </button>
            <button type="button" onClick={changeCommentsModal}>
              <img src="https://img.icons8.com/fluent-systems-regular/48/ffffff/topic.png" alt="commentsIcon" />
            </button>
            <button type="button">
              <img src="https://img.icons8.com/windows/64/ffffff/share-3.png" alt="shareIcon" />
            </button>
          </div>
          {commentsModal && <CommentsModal postId={postId} username={username} />}
        </div>
      </div>
      {likesModal && (
        <>
          <div className="modal" onClickCapture={changeLikesModal} />
          <LikesModal
            title={title}
            likes={likePostData.nrOfLikes}
            postId={postId}
            closeHandler={changeLikesModal}
          />
        </>
      )}
    </div>
  );
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired,
  createdDate: PropTypes.string.isRequired,
  liked: PropTypes.bool,
};

Post.defaultProps = {
  image: '',
  liked: false,
};

export default Post;
