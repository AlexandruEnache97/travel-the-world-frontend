/* eslint-disable react/prop-types */
import React from 'react';
import Post from './Post';

const ListPosts = ({ posts }) => (
  <>
    {posts !== [] && posts.map((post) => (
      <Post
        // eslint-disable-next-line no-underscore-dangle
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
        liked={false}
      />
    ))}
  </>
);

export default ListPosts;
