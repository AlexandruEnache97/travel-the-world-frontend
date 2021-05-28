import React from 'react';
import PropTypes from 'prop-types';
import './mapModal.scss';
import MapPost from './MapPost';

const MapModal = ({
  setMapModal, postLocation, postImage,
  postText, postCoordinates,
}) => (
  <>
    <div className="post-map-modal" onClickCapture={() => { setMapModal(false); }} />
    <div className="post-map-container">
      <h1 className="post-map-title">
        Post location on map
      </h1>
      <button className="post-map-close" type="button" onClick={() => { setMapModal(false); }}>x</button>
      <MapPost
        postLocation={postLocation}
        postImage={postImage}
        postText={postText}
        postCoordinates={postCoordinates}
      />
    </div>
  </>
);

MapModal.propTypes = {
  setMapModal: PropTypes.func.isRequired,
  postLocation: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired,
  postCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MapModal;
