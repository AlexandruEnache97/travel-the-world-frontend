import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './profileInfo.scss';
import EditProfile from './EditProfile/EditProfile';

const ProfileInfo = ({ currentUser, updateInfo }) => {
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  const updateProfile = () => {
    updateInfo();
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
        <button className="user-edit" type="button">Posts saved </button>
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
};
export default ProfileInfo;
