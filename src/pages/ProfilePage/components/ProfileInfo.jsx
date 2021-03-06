import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './profileInfo.scss';
import { Link as LinkScroll } from 'react-scroll';
import EditProfile from './EditProfile/ConnectedEditProfile';

const ProfileInfo = ({ currentUser, updateInfo, showSavedPosts }) => {
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  const updateProfile = () => {
    updateInfo();
  };

  const savedPostsHandler = () => {
    showSavedPosts('Saved posts');
  };

  return (
    <div className="profile-user">
      <div className="profile">
        <div className="user-image">
          <img src={currentUser.profileImage} alt="" />
        </div>
        <p className="user-name">{currentUser.username}</p>
        <p className="user-country">
          Country:
          {'  '}
          {currentUser.country}
        </p>
        <button
          className="user-edit"
          type="button"
          onClick={handleEditProfile}
        >
          Edit profile
        </button>
        <LinkScroll
          to="profileRef"
          containerId="main-page"
          spy
          smooth
          duration={500}
          offset={-100}
          className="user-edit"
          type="button"
          onClick={savedPostsHandler}
        >
          Posts saved
        </LinkScroll>
        <button className="user-edit" type="button">Map</button>
      </div>
      {editProfileModal && (
        <>
          <div className="modal" onClickCapture={handleEditProfile} />
          <EditProfile
            closeModal={handleEditProfile}
            updateProfile={updateProfile}
            currentUser={currentUser}
          />
        </>
      )}
    </div>
  );
};

ProfileInfo.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  updateInfo: PropTypes.func.isRequired,
  showSavedPosts: PropTypes.func.isRequired,
};
export default ProfileInfo;
