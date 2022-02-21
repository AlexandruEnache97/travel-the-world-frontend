import * as React from 'react';
import MenuButton from './MenuButton';
import MobileButton from '../../../../components/Buttons/MobileButton';
import './menuContainer.scss';
import mapIcon from '../../../../images/menuButtons/mapIcon.png';
import groupIcon from '../../../../images/menuButtons/groupIcon.png';
import newPostsIcon from '../../../../images/menuButtons/newPostsIcon.png';
import goalsIcon from '../../../../images/menuButtons/goalsIcon.png';
import friendsIcon from '../../../../images/menuButtons/friendsIcon.png';
import isMobileWindow from '../../../../utils/isMobileWindow';

type MobileMenuHandler = (isActive: boolean) => void;

interface Props {
  currentUser: {
    username: string,
    email: string,
    profileImage: string,
    country: string,
    userLocation: {
      lat: number,
      lng: number
    }
  }
}

const MenuContainer: React.FC<Props> = ({ currentUser }) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [mobileModalActive, setMobileModalActive] = React.useState<boolean>(false);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const mobileMenuHandler: MobileMenuHandler = (isActive) => {
    setMobileModalActive(isActive);
  };

  React.useEffect(() => {
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

export default MenuContainer;
