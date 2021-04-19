/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useLayoutEffect, useRef, useState, useEffect,
} from 'react';
import './mapComponent.scss';
import { addDraggableMarker, createMarker } from '../../utils/hereMap';

const HereMap = ({ userLocation, country }) => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const { H } = window;
    const platform = new H.service.Platform({
      apikey: process.env.HERE_MAP_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: userLocation,
      zoom: 5,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    createMarker(
      hMap,
      { lat: 0, lng: 0 },
      'https://img.icons8.com/android/48/FFFFFF/marker.png',
    );

    createMarker(
      hMap,
      userLocation,
      'https://img.icons8.com/android/48/DC143C/marker.png',
      `<div><p><b>User Location</b></p><p>${country}</p></div>`,
      ui,
    );

    createMarker(
      hMap,
      { lat: 44.86543549519188, lng: 15.581931850936966 },
      'https://img.icons8.com/android/48/006400/marker.png',
      '<p><b>Plitvice Lakes, Croatia</b></p><img src="https://www.busytourist.com/wp-content/uploads/2019/06/Plitvice-Lakes-Croatia.jpg.webp" /><p>The Plitvice Lakes can be found on Croatia’s Adriatic Sea coast, just lingering on the border between Zadar and the nation’s capital, Zagreb.</p>',
      ui,
    );

    addDraggableMarker(hMap, behavior, setCoordinates);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return (
    <div className="map">
      <div ref={mapRef} className="map-container" />
      <div className="map-control">
        {coordinates !== null && (
        <>
          <p>
            Lat:
            {' '}
            {coordinates.lat}
          </p>
          <p>
            Lng:
            {' '}
            {coordinates.lng}
          </p>
        </>
        )}
      </div>
    </div>
  );
};

export default HereMap;
