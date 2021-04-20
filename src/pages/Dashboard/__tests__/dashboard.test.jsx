import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

jest.mock('../components/CreatePost.jsx', () => () => <p>Create Post</p>);
jest.mock('../components/menu/MenuButton.jsx', () => () => <p>Menu Button</p>);

describe('Dashboard component tests', () => {
  it('Should render component correctly', () => {
    const getPosts = jest.fn();
    const getLikedPosts = jest.fn();
    const signOut = jest.fn();
    const auth = { accountData: { username: 'Alex' } };
    render(
      <MemoryRouter>
        <Dashboard
          auth={auth}
          getPosts={getPosts}
          getLikedPosts={getLikedPosts}
          posts={{ currentPosts: [] }}
          signOut={signOut}
        />
      </MemoryRouter>,
    );
  });
});
