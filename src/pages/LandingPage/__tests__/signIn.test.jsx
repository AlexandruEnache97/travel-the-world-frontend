import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../components/SignIn';

describe('SignIn tests', () => {
  it('Should render component correctly', () => {
    render(<SignIn />);

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInput).toBeInTheDocument();

    const password = screen.getByLabelText('Password');
    expect(password).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('Handle form actions', () => {
    render(<SignIn />);

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    fireEvent.change(emailInput, { target: { value: 'email' } });
    expect(emailInput.value).toEqual('email');

    const submitButton = screen.getByRole('button', {
      name: 'Sign In',
    });
    fireEvent.click(submitButton);
  });
});
