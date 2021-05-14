import React from 'react';
import PropTypes from 'prop-types';
import './profileInfo.scss';

const ProfileInfo = ({ currentUser }) => (

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
      <button className="user-edit" type="button">Edit profile</button>
    </div>
  </div>
);

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
