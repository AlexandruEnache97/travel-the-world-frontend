/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useLayoutEffect, useRef, useState, useEffect,
} from 'react';
import './mapComponent.scss';
import addDraggableMarker from '../../utils/hereMap';

const HereMap = ({ userLocation }) => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const { H } = window;
    const platform = new H.service.Platform({
      apikey: 'pFgYJtHrqTkrDk2tguYJQ4Vc2ApdTsbX6edK6WJPkgY',
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: userLocation,
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const iconUserLocation = new H.map.Icon('https://img.icons8.com/android/48/DC143C/marker.png');
    const markerUserLocation = new H.map.Marker(
      userLocation, {
        icon: iconUserLocation,
      },
    );
    hMap.addObject(markerUserLocation);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    addDraggableMarker(hMap, behavior, setCoordinates);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return (
    <>
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
    </>
  );
};

export default HereMap;
