import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../components/SignIn';

describe('SignIn tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole('textbox', {
      name: 'Username',
    });
    expect(usernameInput).toBeInTheDocument();

    const password = screen.getByLabelText('Password');
    expect(password).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('Handle form actions', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole('textbox', {
      name: 'Username',
    });
    fireEvent.change(usernameInput, { target: { value: 'Username' } });
    expect(usernameInput.value).toEqual('Username');

    const submitButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    fireEvent.click(submitButton);
  });
});
