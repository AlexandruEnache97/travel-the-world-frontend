import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

describe('Navbar component tests', () => {
  it('Should render component correctly', () => {
    const signOutMock = jest.fn();
    render(
      <MemoryRouter>
        <Navbar signOut={signOutMock} />
      </MemoryRouter>,
    );
  });

  it('Should sign out', () => {
    const signOutMock = jest.fn();
    render(
      <MemoryRouter>
        <Navbar signOut={signOutMock} />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', {
      name: 'Sign Out',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(signOutMock).toBeCalled();
  });
});
