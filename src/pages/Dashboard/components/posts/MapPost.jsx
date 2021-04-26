/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createMarker } from '../../../../utils/hereMap';

const MapPost = ({
  postLocation, postImage, postText, postCoordinates,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const { H } = window;
    const platform = new H.service.Platform({
      apikey: process.env.HERE_MAP_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: postCoordinates,
      zoom: 7,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    createMarker(
      hMap,
      postCoordinates,
      'https://img.icons8.com/android/48/000000/marker.png',
      `<p><b>${postLocation}</b></p><img src=${postImage} /><p>${postText}</p>`,
      ui,
    );

    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return (
    <>
      <div ref={mapRef} className="post-map" />
      <div className="post-map-bottom" />
    </>
  );
};

MapPost.propTypes = {
  postLocation: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired,
  postCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MapPost;
