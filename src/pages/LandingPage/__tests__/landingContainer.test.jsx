import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingContainer from '../components/LandingContainer';

describe('LandingContainer tests', () => {
  it('Should render component correctly', () => {
    render(<LandingContainer />);

    const signInButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', {
      name: 'Sign Up',
    });
    expect(signUpButton).toBeInTheDocument();

    const logoPlanet = screen.getByAltText('logoPlanet');
    expect(logoPlanet).toBeInTheDocument();

    const backgroundContainer = screen.getByAltText('backgroundContainer');
    expect(backgroundContainer).toBeInTheDocument();
  });
});
