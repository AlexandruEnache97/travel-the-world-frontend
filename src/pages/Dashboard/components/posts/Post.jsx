import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import calculateTimePassed from '../../../../utils/postUtils';
import './post.scss';
import { getUserLikes, likePost, unlikePost } from '../../../../service/postsApi';
import LikesModal from '../likes/LikesModal';
import CommentsModal from '../comments/ConnectedCommentsModal';
import MapModal from './MapModal';

const Post = ({
  postId, username, profileImage, title, text, image,
  category, country, location, likes, shares,
  createdDate, liked, coordinates, postRef,
}) => {
  const [likePostData, setLikePostData] = useState({
    nrOfLikes: 0,
    liked: false,
  });
  const [likesModal, setLikesModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);

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
    <div className="post-container" ref={postRef}>
      <div className="post-top">
        <div className="post-user">
          <img className="post-user-icon" src={profileImage} alt="userIcon" />
          <p>{username}</p>
        </div>
        <button className="bookmark-button" type="button">
          <img src="https://img.icons8.com/fluent-systems-regular/96/ffffff/bookmark-ribbon--v1.png" alt="save-bookmark" />
        </button>
      </div>
      <div className="post-content">
        <h1>{title}</h1>
        <div className="post-location">
          <button type="button" className="location-text" onClick={() => { setMapModal(true); }}>
            <img src="https://img.icons8.com/material/24/000000/worldwide-location--v1.png" alt="locationIcon" />
            <p>
              {location}
              ,
              {' '}
              {country}
            </p>
          </button>
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
          {commentsModal
            && (
              <CommentsModal
                postId={postId}
                postUser={username}
              />
            )}
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
            getLikes={getUserLikes}
          />
        </>
      )}
      {mapModal && (
        <MapModal
          setMapModal={setMapModal}
          postLocation={`${location} ${country}`}
          postImage={image}
          postText={text}
          postCoordinates={coordinates}
        />
      )}
    </div>
  );
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired,
  createdDate: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  postRef: PropTypes.func,
};

Post.defaultProps = {
  image: '',
  liked: false,
  postRef: () => { },
};

export default Post;
