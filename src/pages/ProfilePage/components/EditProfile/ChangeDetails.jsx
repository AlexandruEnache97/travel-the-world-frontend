/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './changeDetails.scss';
import { changeProfileDetails } from '../../../../service/authApi';

const ChangeDetails = ({ currentUser, closeModal, updateProfile }) => {
  const [profileDetails, setProfileDetails] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  });

  const inputChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDetails = async (e) => {
    e.preventDefault();
    await changeProfileDetails(profileDetails)
      .catch(() => console.log('Password incorrect'));
    closeModal();
    updateProfile();
  };

  return (
    <div className="edit-details">
      <p className="edit-title">Edit account details</p>
      <form onSubmit={handleChangeDetails}>
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
          <label htmlFor="password">Verify password</label>
          <input
            name="password"
            type="password"
            id="password"
            value={profileDetails.password}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit">Done</button>
      </form>
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
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default ChangeDetails;
