import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';

describe('LandingPage tests', () => {
  const verifyAuth = jest.fn();
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <LandingPage
          verifyAuth={verifyAuth}
          location={{ pathname: '/' }}
          history={{ replace: () => { }, push: () => { } }}
        />
      </MemoryRouter>,
    );

    const backgroundGradient = screen.getByAltText('backgroundGradient');
    expect(backgroundGradient).toBeInTheDocument();
  });
});
