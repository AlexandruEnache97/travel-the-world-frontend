import React from 'react';
import './postsMenu.scss';

const PostsMenu = () => (
  <div className="posts-menu" id="topRef">
    <button className="active-button" type="button">News feed</button>
    <button type="button">Recommended locations</button>
    <button type="button">Create new post</button>
  </div>
);

export default PostsMenu;
