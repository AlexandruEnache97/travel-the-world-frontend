/* eslint-disable react/prop-types */
import React from 'react';
import Post from './Post';

const ListPosts = ({ posts, likedPosts, userId }) => (
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
          userId={userId}
          postId={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          location={post.location}
          category={post.category}
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
