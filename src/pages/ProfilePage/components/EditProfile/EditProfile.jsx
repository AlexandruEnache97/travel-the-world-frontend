/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import './editProfile.scss';
import ChangeImage from './ChangeImage';
import ChangeDetails from './ChangeDetails';

const EditProfile = ({ closeModal, updateProfile, currentUser }) => (
  <div className="edit-profile-container">
    <div className="edit-top">
      <p>Edit profile</p>
      <button type="button" onClick={closeModal}>x</button>
    </div>
    <div className="edit-content">
      <ChangeDetails currentUser={currentUser} />
      <ChangeImage closeModal={closeModal} updateProfile={updateProfile} />
    </div>
    <div className="edit-bottom" />
  </div>
);

EditProfile.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default EditProfile;
