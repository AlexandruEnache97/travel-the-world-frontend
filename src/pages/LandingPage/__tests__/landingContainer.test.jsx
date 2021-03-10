import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingContent from '../components/LandingContent';

describe('LandingContainer tests', () => {
  it('Should render component correctly', () => {
    render(<LandingContent />);

    const signInButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', {
      name: 'Sign Up',
    });
    expect(signUpButton).toBeInTheDocument();
  });
});
