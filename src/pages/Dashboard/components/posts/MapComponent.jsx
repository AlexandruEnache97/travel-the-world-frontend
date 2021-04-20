import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { addDraggableMarker } from '../../../../utils/hereMap';

const MapComponent = ({ countryCoordinates, getCoordinates }) => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(countryCoordinates);

  const getCoordinatesMap = () => {
    getCoordinates(coordinates);
  };

  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const { H } = window;
    const platform = new H.service.Platform({
      apikey: process.env.HERE_MAP_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: countryCoordinates,
      zoom: 5,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    H.ui.UI.createDefault(hMap, defaultLayers);

    addDraggableMarker(hMap, behavior, coordinates, setCoordinates);
    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return (
    <>
      <div ref={mapRef} className="post-map" />
      <div className="post-map-buttons">
        <button type="button" onClick={getCoordinatesMap}>
          Done
        </button>
      </div>
    </>
  );
};

MapComponent.propTypes = {
  countryCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  getCoordinates: PropTypes.func.isRequired,
};

export default MapComponent;
