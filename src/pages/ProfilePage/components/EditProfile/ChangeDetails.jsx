import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './changeDetails.scss';

const ChangeDetails = ({ currentUser }) => {
  const [profileDetails, setProfileDetails] = useState({
    username: currentUser.username,
    email: currentUser.email,
    verifyPassword: '',
  });

  const inputChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDetails = () => {
    console.log(profileDetails);
  };

  return (
    <div className="edit-details">
      <p className="edit-title">Edit account details</p>
      <div className="edit-element">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          id="username"
          value={profileDetails.username}
          onChange={inputChange}
          required
        />
      </div>
      <div className="edit-element">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          id="email"
          value={profileDetails.email}
          onChange={inputChange}
          required
        />
      </div>
      <div className="edit-element">
        <label htmlFor="verifyPassword">Verify password</label>
        <input
          name="verifyPassword"
          type="password"
          id="verifyPassword"
          value={profileDetails.verifyPassword}
          onChange={inputChange}
          required
        />
      </div>
      <button type="button" onClick={handleChangeDetails}>Done</button>
    </div>
  );
};

ChangeDetails.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default ChangeDetails;
