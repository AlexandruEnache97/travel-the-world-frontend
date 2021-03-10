import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../LandingPage';

describe('LandingPage tests', () => {
  it('Should render component correctly', () => {
    render(<LandingPage />);

    const backgroundGradient = screen.getByAltText('backgroundGradient');
    expect(backgroundGradient).toBeInTheDocument();
  });
});
