import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProtectedRoute from '../ProtectedRoute';
import { authLogged, authLoggedOut } from '../../../utils/unitTesting';
import LandingPage from '../../../pages/LandingPage/LandingPage';

jest.mock('../../../pages/LandingPage/LandingPage', () => () => <p>LandingPage</p>);

describe('ProtectedRoute component tests', () => {
  it('Should render component when authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute
          component={LandingPage}
          auth={authLogged}
        />
      </MemoryRouter>,
    );
  });
  it('Should redirect when authenticated', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute
          component={LandingPage}
          auth={authLoggedOut}
        />
      </MemoryRouter>,
    );
  });
});
