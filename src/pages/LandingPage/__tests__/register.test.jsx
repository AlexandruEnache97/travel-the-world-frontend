import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Register from '../components/Register';

describe('Register tests', () => {
  it('Should render component correctly', () => {
    const signUpMock = jest.fn();
    render(
      <MemoryRouter>
        <Register signUp={signUpMock} />
      </MemoryRouter>,
    );

    const username = screen.getByRole('textbox', {
      name: 'Username',
    });
    expect(username).toBeInTheDocument();

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInput).toBeInTheDocument();

    const password = screen.getByLabelText('Password');
    expect(password).toBeInTheDocument();

    const verifyPassword = screen.getByLabelText('Verify password');
    expect(verifyPassword).toBeInTheDocument();

    const selectCountry = screen.getByRole('combobox');
    expect(selectCountry).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: 'Sign Up',
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('Handle form actions', () => {
    const signUpMock = jest.fn();
    render(
      <MemoryRouter>
        <Register signUp={signUpMock} />
      </MemoryRouter>,
    );

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    fireEvent.change(emailInput, { target: { value: 'email' } });
    expect(emailInput.value).toEqual('email');

    const submitButton = screen.getByRole('button', {
      name: 'Sign Up',
    });
    fireEvent.click(submitButton);
  });

  it('Handle change select', () => {
    const signUpMock = jest.fn();
    render(
      <MemoryRouter>
        <Register signUp={signUpMock} />
      </MemoryRouter>,
    );
    const selectCountry = screen.getByRole('combobox');
    fireEvent.change(selectCountry, { target: { value: 'Algeria' } });
    expect(selectCountry.children[0].selected).toBeFalsy();
    expect(selectCountry.children[2].selected).toBeTruthy();
  });
});
