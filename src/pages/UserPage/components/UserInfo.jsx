import React from 'react';
import PropTypes from 'prop-types';

import '../../ProfilePage/components/profileInfo.scss';

const UserInfo = ({ username, profileImage }) => (
  <div className="profile-user">
    <div className="profile">
      <div className="user-image">
        <img src={profileImage} alt="" />
      </div>
      <p className="user-name">{username}</p>
    </div>
  </div>
);

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};

export default UserInfo;
