/* eslint-disable react/prop-types */
import React from 'react';

const ProfilePage = ({ auth }) => {
  const { accountData } = auth;
  return (
    <div className="profile-page">
      <p>Profile page</p>
      <p>{accountData.username}</p>
    </div>
  );
};

export default ProfilePage;
