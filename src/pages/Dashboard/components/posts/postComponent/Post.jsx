import React from 'react';
import PropTypes from 'prop-types';
import './post.scss';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostControls from './PostControls';

const Post = ({
  post, liked, postRef, createAlert,
}) => {
  const {
    userData, title, text, postImage,
    location, country, category, coordinates,
    likes, shares, createdDate,
  } = post;

  return (
    <div className="post-container" ref={postRef}>
      <PostHeader userData={userData} />
      <PostContent
        title={title}
        location={location}
        country={country}
        category={category}
        text={text}
        postImage={postImage}
        coordinates={coordinates}
        createdDate={createdDate}
      />
      <PostControls
        id={post._id}
        likes={likes}
        shares={shares}
        liked={liked}
        createAlert={createAlert}
        title={title}
        username={userData.username}
      />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    postImage: PropTypes.string,
    location: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    shares: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  liked: PropTypes.bool,
  postRef: PropTypes.func,
  createAlert: PropTypes.func.isRequired,
};

Post.defaultProps = {
  liked: false,
  postRef: () => { },
};

export default Post;
