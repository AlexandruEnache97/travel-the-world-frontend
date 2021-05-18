import React, { useState } from 'react';
import './changePassword.scss';

const ChangePassword = () => {
  const [changedPassword, setChangedPassword] = useState({
    oldPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const changePasswordHandle = (e) => {
    e.preventDefault();
    console.log(changedPassword);
  };

  const inputChange = (e) => {
    setChangedPassword({
      ...changedPassword,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-password">
      <p className="title">Change password</p>
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
          <label htmlFor="verifyNewPassword">Verify new password</label>
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

export default ChangePassword;
