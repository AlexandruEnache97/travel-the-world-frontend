import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
import PostsContainer from '../PostsContainer';

const currentUser = {
  username: 'Alex',
  email: 'alex@gmail.com',
  profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
  country: 'Romania',
  userLocation: {
    lat: 36,
    lng: 32,
  },
};

const posts = {
  currentPosts: [],
  likedPosts: [],
  totalResults: 0,
  singlePost: {},
};

describe('PostsContainer component tests', () => {
  const getPosts = jest.fn();
  const getLikedPosts = jest.fn();
  const createPost = jest.fn();
  const createAlert = jest.fn();

  it('Should render component correctly', () => {
    render(
      <PostsContainer
        currentUser={currentUser}
        posts={posts}
        getPosts={getPosts}
        getLikedPosts={getLikedPosts}
        createPost={createPost}
        createAlert={createAlert}
      />,
    );
    expect(getPosts).toBeCalled();
    expect(getLikedPosts).toBeCalled();
  });
});
