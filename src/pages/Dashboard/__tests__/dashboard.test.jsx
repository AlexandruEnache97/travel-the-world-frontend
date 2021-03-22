import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

describe('Dashboard component tests', () => {
  it('Should render component correctly', () => {
    const getPosts = jest.fn();
    const signOut = jest.fn();
    const auth = { accountData: { username: 'Alex' } };
    render(
      <MemoryRouter>
        <Dashboard
          auth={auth}
          getPosts={getPosts}
          posts={{ currentPosts: [] }}
          signOut={signOut}
        />
      </MemoryRouter>,
    );
  });
});
