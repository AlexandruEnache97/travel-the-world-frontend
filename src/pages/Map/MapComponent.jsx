import React from 'react';
import PropTypes from 'prop-types';
import HereMap from './HereMap';
import Navbar from '../../components/Navbar/Navbar.tsx';

const MapComponent = ({
  auth, signOut, posts, getPosts,
}) => (
  <div className="mapComponent">
    <Navbar signOut={signOut} />
    {auth !== undefined
      && (
        <HereMap
          userData={{
            username: auth.accountData.username,
            profileImage: auth.accountData.profileImage,
          }}
          userLocation={auth.accountData.userLocation}
          country={auth.accountData.country}
          posts={posts}
          getPosts={getPosts}
        />
      )}
  </div>
);

MapComponent.propTypes = {
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
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

export default MapComponent;
