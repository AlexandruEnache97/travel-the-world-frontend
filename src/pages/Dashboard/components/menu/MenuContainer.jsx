import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import MobileButton from '../../../../components/Buttons/MobileButton';
import './menuContainer.scss';
import mapIcon from '../../../../images/menuButtons/mapIcon.png';
import groupIcon from '../../../../images/menuButtons/groupIcon.png';
import newPostsIcon from '../../../../images/menuButtons/newPostsIcon.png';
import goalsIcon from '../../../../images/menuButtons/goalsIcon.png';
import friendsIcon from '../../../../images/menuButtons/friendsIcon.png';
import isMobileWindow from '../../../../utils/isMobileWindow';

const MenuContainer = ({ currentUser }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileModalActive, setMobileModalActive] = useState(false);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const mobileMenuHandler = (isActive) => {
    setMobileModalActive(isActive);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
      document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <>
      {(!isMobileWindow(windowWidth) || (isMobileWindow(windowWidth) && mobileModalActive))
        && (
          <div className="menu-container">
            <div className="menu">
              <MenuButton image={currentUser.profileImage} text={currentUser.username} redirect="/profile" isProfile />
              <MenuButton image={mapIcon} text="Map" redirect="/map" />
              <MenuButton image={goalsIcon} text="Your goals" redirect="/test" />
              <MenuButton image={friendsIcon} text="Friends" />
              <MenuButton image={groupIcon} text="Groups" />
              <MenuButton image={newPostsIcon} text="New posts" />
            </div>
          </div>
        )}
      <MobileButton mobileMenuHandler={mobileMenuHandler} />
    </>
  );
};

MenuContainer.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default MenuContainer;
