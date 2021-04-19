/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MenuButton from './MenuButton';
import './menuContainer.scss';
import mapIcon from '../../../../images/menuButtons/mapIcon.png';
import groupIcon from '../../../../images/menuButtons/groupIcon.png';
import newPostsIcon from '../../../../images/menuButtons/newPostsIcon.png';
import goalsIcon from '../../../../images/menuButtons/goalsIcon.png';
import friendsIcon from '../../../../images/menuButtons/friendsIcon.png';
import MobileButton from '../../../../components/Buttons/MobileButton';

const MenuContainer = ({ currentUser }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileModal, setMobileModal] = useState(false);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const getMobileMenu = (isActive) => {
    setMobileModal(isActive);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);
  return (
    <>
      {(windowWidth > 601 || (windowWidth < 601 && mobileModal))
        && (
          <div className="menuContainer">
            <MenuButton image={currentUser.profileImage} text={currentUser.username} redirect="/profile" isProfile />
            <MenuButton image={mapIcon} text="Map" redirect="/map" />
            <MenuButton image={goalsIcon} text="Your goals" />
            <MenuButton image={friendsIcon} text="Friends" />
            <MenuButton image={groupIcon} text="Groups" />
            <MenuButton image={newPostsIcon} text="New posts" />
          </div>
        )}
      <MobileButton getMobileMenu={getMobileMenu} />
    </>
  );
};

export default MenuContainer;
