import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';

describe('LandingPage tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <LandingPage location={{ pathname: '/' }} />
      </MemoryRouter>,
    );

    const backgroundGradient = screen.getByAltText('backgroundGradient');
    expect(backgroundGradient).toBeInTheDocument();
  });
});
