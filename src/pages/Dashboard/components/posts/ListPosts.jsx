import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const ListPosts = ({ posts, likedPosts }) => (
  <>
    {posts !== [] && posts.map((post) => {
      const checkLikedPost = () => {
        let postLiked = false;
        likedPosts.map((likedPost) => {
          if (likedPost === post._id) {
            postLiked = true;
            return postLiked;
          }
        });
        return postLiked;
      };

      return (
        <Post
          postId={post._id}
          username={post.username}
          profileImage={post.profileImage}
          title={post.title}
          text={post.text}
          location={post.location}
          country={post.country}
          category={post.category}
          coordinates={post.coordinates}
          image={post.postImage}
          likes={post.likes}
          shares={post.shares}
          createdDate={post.createdDate}
          key={post.title + Math.random(0, 10000)}
          liked={checkLikedPost()}
        />
      );
    })}
  </>
);

ListPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    postImage: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shares: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  })).isRequired,
  likedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListPosts;
