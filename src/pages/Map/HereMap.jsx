/* eslint-disable no-unused-vars */
import React, {
  useLayoutEffect, useRef, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import './mapComponent.scss';
import { createMarker } from '../../utils/hereMap';
import RECOMMENDED_POSTS from '../../utils/recommendedPosts';

const HereMap = ({
  userData, userLocation, country, posts, getPosts,
}) => {
  const mapRef = useRef(null);
  const [currentPosts, setCurrentPosts] = useState(posts.currentPosts);

  useEffect(() => {
    setCurrentPosts(posts.currentPosts);
  }, [posts]);

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
        `<div class="user-marker">
          <div>
            <img class="profile-image" src=${userData.profileImage} />
            <p><b>${userData.username}</b></p>
          </div>
          <p>${country}</p>
        </div>`,
        ui,
      );
    }

    posts.currentPosts.map((post) => {
      const marker = post.userData.username === userData.username
        ? 'https://img.icons8.com/android/48/00E600/marker.png'
        : 'https://img.icons8.com/android/48/252627/marker.png';
      createMarker(
        hMap,
        post.coordinates,
        marker,
        `<p><b>${post.location}</b></p>
        <img class="post-image" src=${post.postImage} /><p>${post.text}</p>`,
        ui,
      );
    });

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, posts]);

  const getMorePostsHandler = (e) => {
    getPosts(posts.pageNumber + 1);
  };

  return (
    <div className="map">
      <div ref={mapRef} className="map-container" />
      <div className="legend-container">
        <p>Legend</p>
        <div>
          <img src="https://img.icons8.com/android/48/00E600/marker.png" alt="markerGray" />
          <p>Feed posts</p>
        </div>
        <div>
          <img src="https://img.icons8.com/android/48/252627/marker.png" alt="markerGray" />
          <p>Own posts</p>
        </div>
      </div>
      {posts.totalResults > posts.pageNumber * 10 ? (
        <div className="more-posts-container">
          <p>There are more posts available!</p>
          <button type="button" onClick={getMorePostsHandler}>Load more</button>
        </div>
      ) : (
        <div className="more-posts-container">
          <p>There are no more posts!</p>
        </div>
      )}
    </div>
  );
};

HereMap.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
  userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  country: PropTypes.string.isRequired,
  posts: PropTypes.shape({
    currentPosts: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userData: PropTypes.objectOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      postImage: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      shares: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired,
    likedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
    singlePost: PropTypes.objectOf(PropTypes.string).isRequired,
    totalResults: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
  }).isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default HereMap;
