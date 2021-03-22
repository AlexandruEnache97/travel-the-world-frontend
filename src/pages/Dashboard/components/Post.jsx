import React from 'react';
import PropTypes from 'prop-types';
import './post.scss';

const Post = ({
  username, title, text, image, category, location, likes, shares, createdDate,
}) => {
  Post.propTypes = {
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
  };

  Post.defaultProps = {
    image: '',
  };

  const calculateTimePassed = () => {
    const secondsPassed = Math.round((Date.now() - Date.parse(createdDate)) / 1000);
    if (secondsPassed > 60 * 60 * 24) {
      return `${Math.round(secondsPassed / 60 / 60 / 24)} days ago`;
    } if (secondsPassed > 60 * 60) {
      return `${Math.round(secondsPassed / 60 / 60)} hours ago`;
    } if (secondsPassed > 60) {
      return `${Math.round(secondsPassed / 60)} minutes ago`;
    }
    return 'A minute ago';
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
        <p>{calculateTimePassed()}</p>
        <p>{text}</p>
        {image !== '' && <img className="post-image" src={image} alt="postImage" />}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-text">
          <p>
            {likes}
            {' '}
            likes
          </p>
          <p>
            {shares}
            {' '}
            shares
          </p>
        </div>
        <div className="post-bottom-buttons">
          <button type="button">
            <img src="https://img.icons8.com/ios/50/ffffff/facebook-like--v1.png" alt="likeIcon" />
          </button>
          <button type="button">
            <img src="https://img.icons8.com/fluent-systems-regular/48/ffffff/topic.png" alt="commentsIcon" />
          </button>
          <button type="button">
            <img src="https://img.icons8.com/windows/64/ffffff/share-3.png" alt="shareIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
