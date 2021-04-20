import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './postMapLocation.scss';
import MapComponent from './MapComponent';

const PostMapLocation = ({ countryCoordinates, getPostCoordinates }) => {
  const [mapModal, setMapModal] = useState(false);

  const getCoordinates = (coordinates) => {
    setMapModal(!mapModal);
    getPostCoordinates(coordinates);
  };

  return (
    <div className="post-map-control">
      <button type="button" onClick={() => { setMapModal(!mapModal); }}>
        Set location on map
      </button>
      {mapModal && (
        <>
          <div className="post-map-modal" onClickCapture={() => { setMapModal(!mapModal); }} />
          <div className="post-map-container">
            <h1 className="post-map-title">
              Set the marker on the map
            </h1>
            <MapComponent
              countryCoordinates={countryCoordinates}
              getCoordinates={getCoordinates}
            />
          </div>
        </>
      )}
    </div>
  );
};

PostMapLocation.propTypes = {
  countryCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  getPostCoordinates: PropTypes.func.isRequired,
};

export default PostMapLocation;
