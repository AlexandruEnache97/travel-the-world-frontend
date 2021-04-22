/* eslint-disable react/prop-types */
import React from 'react';
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

export default ListPosts;
