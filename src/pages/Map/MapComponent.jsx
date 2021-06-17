import React from 'react';
import PropTypes from 'prop-types';
import HereMap from './HereMap';
import Navbar from '../../components/Navbar/Navbar';

const MapComponent = ({ auth, signOut }) => (
  <div className="mapComponent">
    <Navbar signOut={signOut} />
    {auth !== undefined
      && (
        <HereMap
          userData={{
            username: auth.accountData.username,
            profileImage: auth.accountData.profileImage,
          }}
          userLocation={auth.accountData.userLocation}
          country={auth.accountData.country}
        />
      )}
  </div>
);

MapComponent.propTypes = {
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default MapComponent;
