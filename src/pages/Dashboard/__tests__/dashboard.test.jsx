import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';

describe('Dashboard component tests', () => {
  it('Should render component correctly', () => {
    const getPosts = jest.fn();
    const auth = { accountData: { username: 'Alex' } };
    render(<Dashboard
      auth={auth}
      getPosts={getPosts}
      posts={{ currentPosts: [] }}
    />);
  });
});
