import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './profileInfo.scss';
import EditProfile from './EditProfile';

const ProfileInfo = ({ currentUser }) => {
  const profileImage = useRef();
  const [editProfileModal, setEditProfileModal] = useState(false);

  useEffect(() => {
    console.log(`${profileImage.current.naturalWidth} ${profileImage.current.naturalHeight}`);
  }, []);

  const handleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  return (
    <div className="profile-user" id="profileRef">
      <div className="profile">
        <div className="user-image">
          <img
            ref={profileImage}
            src={currentUser.profileImage}
            alt=""
          />

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
        <button className="user-edit" type="button">Map</button>
      </div>
      {editProfileModal && (
        <>
          <div className="modal" onClickCapture={handleEditProfile} />
          <EditProfile closeModal={handleEditProfile} />
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
};
export default ProfileInfo;
