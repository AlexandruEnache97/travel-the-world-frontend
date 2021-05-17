import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './profileInfo.scss';

const ProfileInfo = ({ currentUser }) => {
  const profileImage = useRef();

  useEffect(() => {
    console.log(`${profileImage.current.naturalWidth} ${profileImage.current.naturalHeight}`);
  }, []);

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
        <button className="user-edit" type="button">Edit profile</button>
        <button className="user-edit" type="button">Map</button>
      </div>
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
