import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProtectedRoute from '../ProtectedRoute';
import LandingPage from '../../../pages/LandingPage/LandingPage';

describe('ProtectedRoute component tests', () => {
  it('Should render component when authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute
          component={LandingPage}
          auth={{ isAuthenticated: true }}
        />
      </MemoryRouter>,
    );
  });
  it('Should redirect when authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute auth={{ isAuthenticated: false }} />
      </MemoryRouter>,
    );
  });
});
