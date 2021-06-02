import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currentUser, posts } from '../../../../../utils/unitTesting';
import PostsContainer from '../PostsContainer';

jest.mock('../ListPost.jsx', () => () => <p>Post list</p>);

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
