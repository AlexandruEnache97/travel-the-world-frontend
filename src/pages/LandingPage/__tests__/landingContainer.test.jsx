import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingContent from '../components/LandingContent';

describe('LandingContainer tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <LandingContent />
      </MemoryRouter>,
    );

    const signInButton = screen.getByRole('link', {
      name: 'Sign In',
    });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('link', {
      name: 'Sign Up',
    });
    expect(signUpButton).toBeInTheDocument();
  });
});
