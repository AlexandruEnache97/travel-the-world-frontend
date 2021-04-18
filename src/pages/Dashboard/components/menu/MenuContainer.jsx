/* eslint-disable react/prop-types */
import React from 'react';
import MenuButton from './MenuButton';
import './menuContainer.scss';
import mapIcon from '../../../../images/menuButtons/mapIcon.png';
import groupIcon from '../../../../images/menuButtons/groupIcon.png';
import newPostsIcon from '../../../../images/menuButtons/newPostsIcon.png';
import goalsIcon from '../../../../images/menuButtons/goalsIcon.png';
import friendsIcon from '../../../../images/menuButtons/friendsIcon.png';

const MenuContainer = ({ currentUser }) => (
  <div className="menuContainer">
    <MenuButton image={currentUser.profileImage} text={currentUser.username} isProfile />
    <MenuButton image={mapIcon} text="Map" redirect="/map" />
    <MenuButton image={goalsIcon} text="Your goals" />
    <MenuButton image={friendsIcon} text="Friends" />
    <MenuButton image={groupIcon} text="Groups" />
    <MenuButton image={newPostsIcon} text="New posts" />
  </div>
);

export default MenuContainer;
