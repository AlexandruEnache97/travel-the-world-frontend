import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

jest.mock('../components/menu/MenuButton.jsx', () => () => <p>Menu Button</p>);
jest.mock('../../../components/Buttons/ScrollButton', () => () => <p>Scroll</p>);
jest.mock('../../../components/Alerts/ConnectedAlert.jsx', () => () => <p>Alert</p>);
jest.mock('../components/posts/ConnectedPostsContainer.jsx', () => () => <p>Posts Container</p>);

describe('Dashboard component tests', () => {
  it('Should render component correctly', () => {
    const getPosts = jest.fn();
    const getLikedPosts = jest.fn();
    const signOut = jest.fn();
    const auth = {
      accountData: {
        username: 'Alex',
        email: 'alex@gmail.com',
        profileImage: '',
        country: 'Romania',
        userLocation: {
          lat: 0,
          lng: 0,
        },
      },
      accountId: '1',
      isAuthenticated: true,
    };
    render(
      <MemoryRouter>
        <Dashboard
          auth={auth}
          getPosts={getPosts}
          getLikedPosts={getLikedPosts}
          posts={{
            currentPosts: [],
            likedPosts: [],
            singlePost: {},
            totalResults: 0,
          }}
          signOut={signOut}
          createAlert={() => { }}
          createPost={() => { }}
        />
      </MemoryRouter>,
    );
  });
});
