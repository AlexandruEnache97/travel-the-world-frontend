/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useLayoutEffect, useRef,
} from 'react';
import './mapComponent.scss';
import { createMarker } from '../../utils/hereMap';
import RECOMMENDED_POSTS from '../../utils/recommendedPosts';

const HereMap = ({ userLocation, country }) => {
  const mapRef = useRef(null);

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

    if (userLocation !== undefined) {
      createMarker(
        hMap,
        userLocation,
        'https://img.icons8.com/android/48/DC143C/marker.png',
        `<div><p><b>User Location</b></p><p>${country}</p></div>`,
        ui,
      );
    }

    RECOMMENDED_POSTS.map((post) => {
      createMarker(
        hMap,
        post.coordinates,
        'https://img.icons8.com/android/48/006400/marker.png',
        `<p><b>${post.location}</b></p><img src=${post.image} /><p>${post.text}</p>`,
        ui,
      );
    });

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return (
    <div className="map">
      <div ref={mapRef} className="map-container" />
    </div>
  );
};

export default HereMap;
