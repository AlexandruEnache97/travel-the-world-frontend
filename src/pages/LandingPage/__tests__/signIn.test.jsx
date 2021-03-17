import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import SignIn from '../components/SignIn';

describe('SignIn tests', () => {
  it('Should render component correctly', () => {
    const signInMock = jest.fn();
    render(
      <MemoryRouter>
        <SignIn signIn={signInMock} auth={{ isAuthenticated: false }} />
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
    const signInMock = jest.fn();
    render(
      <MemoryRouter>
        <SignIn signIn={signInMock} auth={{ isAuthenticated: false }} />
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

  it('Should redirect user authenticated', () => {
    const signInMock = jest.fn();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <SignIn
          signIn={signInMock}
          history={history}
          auth={{ isAuthenticated: true }}
        />
      </Router>,
    );
    expect(history.location.pathname).toEqual('/dashboard');
  });
});
