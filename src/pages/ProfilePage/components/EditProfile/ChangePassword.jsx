/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './changePassword.scss';
import { changePassword } from '../../../../service/authApi';

const ChangePassword = ({ updateProfile, closeModal }) => {
  const [changedPassword, setChangedPassword] = useState({
    oldPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const changePasswordHandle = async (e) => {
    e.preventDefault();
    if (changedPassword.newPassword !== changedPassword.verifyNewPassword) {
      alert('New passwords does not match');
    } else if (changedPassword.oldPassword === changedPassword.newPassword) {
      alert('New password must be different from the old one');
    } else {
      await changePassword({
        oldPassword: changedPassword.oldPassword,
        newPassword: changedPassword.newPassword,
      })
        .then(() => {
          updateProfile();
          closeModal();
          alert('Password changed');
        })
        .catch(() => alert('Old password incorrect'));
    }
  };

  const inputChange = (e) => {
    setChangedPassword({
      ...changedPassword,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-password">
      <p className="edit-title">Change password</p>
      <form onSubmit={changePasswordHandle}>
        <div className="edit-element">
          <label htmlFor="oldPassword">Old password</label>
          <input
            name="oldPassword"
            type="password"
            id="oldPassword"
            value={changedPassword.oldPassword}
            onChange={inputChange}
            required
          />
        </div>
        <div className="edit-element">
          <label htmlFor="newPassword">New password</label>
          <input
            name="newPassword"
            type="password"
            id="newPassword"
            value={changedPassword.newPassword}
            onChange={inputChange}
            required
          />
        </div>
        <div className="edit-element">
          <label htmlFor="verifyNewPassword">Verify password</label>
          <input
            name="verifyNewPassword"
            type="password"
            id="verifyNewPassword"
            value={changedPassword.verifyNewPassword}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default ChangePassword;
