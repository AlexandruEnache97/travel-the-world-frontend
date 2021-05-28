import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './postMapLocation.scss';
import MapComponent from './MapComponent';

const PostMapLocation = ({ countryCoordinates, getPostCoordinates }) => {
  const [mapModal, setMapModal] = useState(false);
  const [markedOnMap, setMarkedOnMap] = useState(false);

  const postMapHandler = () => {
    setMapModal(!mapModal);
  };

  const getCoordinates = (coordinates) => {
    setMapModal(!mapModal);
    getPostCoordinates(coordinates);
    setMarkedOnMap(true);
  };

  return (
    <div className="post-map-control">
      <button type="button" className="location-button" onClick={postMapHandler}>
        Set location on map
      </button>
      <img
        src={markedOnMap
          ? 'https://img.icons8.com/ios-glyphs/60/01c61c/checked-2.png'
          : 'https://img.icons8.com/ios-glyphs/60/000000/checked-2.png'}
        alt="markLocation"
        className="marked-icon"
      />
      {mapModal && (
        <>
          <div className="map-modal" onClickCapture={postMapHandler} />
          <div className="set-map-container">
            <h1 className="set-map-title">
              Set location on map
            </h1>
            <button className="post-map-close" type="button" onClick={postMapHandler}>x</button>
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
