import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const ListPosts = ({
  posts, likedPosts, hasMore, getMorePosts, createAlert,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (loading) {
      await getMorePosts();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  const observer = useRef();
  const lastPostRef = useCallback((post) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        observer.current.unobserve(post);
        setLoading(true);
      }
    });
    if (post) observer.current.observe(post);
  }, [hasMore]);

  return (
    <>
      {posts !== [] && posts.map((post, index) => {
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

        if (posts.length === index + 1) {
          return (
            <Post
              postRef={lastPostRef}
              postId={post._id}
              userData={post.userData}
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
              createAlert={createAlert}
            />
          );
        }
        return (
          <Post
            postId={post._id}
            userData={post.userData}
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
            createAlert={createAlert}
          />
        );
      })}
    </>
  );
};

ListPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userData: PropTypes.objectOf(PropTypes.string).isRequired,
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
  hasMore: PropTypes.bool.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default ListPosts;
