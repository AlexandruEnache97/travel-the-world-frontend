import React from 'react';
import './profileMenu.scss';

const ProfileMenu = () => (
  <div className="profile-menu">
    <button className="active-button" type="button">Your posts</button>
    <button type="button">Posts saved</button>
    <button type="button">Create new post</button>
  </div>
);

export default ProfileMenu;
