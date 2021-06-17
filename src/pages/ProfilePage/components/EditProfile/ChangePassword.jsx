/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './changePassword.scss';
import { changePassword } from '../../../../service/authApi';

const ChangePassword = ({ updateProfile, closeModal, createAlert }) => {
  const [changedPassword, setChangedPassword] = useState({
    oldPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const changePasswordHandle = async (e) => {
    e.preventDefault();
    if (changedPassword.newPassword !== changedPassword.verifyNewPassword) {
      createAlert('New passwords does not match', 3);
    } else if (changedPassword.oldPassword === changedPassword.newPassword) {
      createAlert('New password must be different from the old one', 3);
    } else {
      await changePassword({
        oldPassword: changedPassword.oldPassword,
        newPassword: changedPassword.newPassword,
      })
        .then(() => {
          updateProfile();
          closeModal();
          createAlert('Password changed', 3);
        })
        .catch(() => createAlert('Old password incorrect', 3));
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
  createAlert: PropTypes.func.isRequired,
};

export default ChangePassword;
