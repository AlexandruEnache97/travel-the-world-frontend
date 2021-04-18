/* eslint-disable react/prop-types */
import React from 'react';
import HereMap from './HereMap';
import Navbar from '../Dashboard/components/Navbar';

const MapComponent = ({ auth, signOut }) => (
  <div className="mapComponent">
    <Navbar signOut={signOut} />
    {auth !== undefined
     && <HereMap userLocation={auth.accountData.userLocation} />}
  </div>
);

export default MapComponent;
