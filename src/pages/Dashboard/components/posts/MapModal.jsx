/* eslint-disable react/prop-types */
import React from 'react';
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

export default MapModal;
