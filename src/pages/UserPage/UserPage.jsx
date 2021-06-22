import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

const UserPage = ({ location, signOut }) => {
  const { userId, username, profileImage } = location.state;

  return (
    <>
      <Navbar signOut={signOut} />
      <div>
        <p>{userId}</p>
        <p>{username}</p>
        <p>{profileImage}</p>
      </div>
    </>
  );
};

UserPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default UserPage;
