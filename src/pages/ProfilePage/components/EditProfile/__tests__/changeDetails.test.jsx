import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { currentUser } from '../../../../../utils/unitTesting';
import { NODE_SERVER, AUTH_ROUTES } from '../../../../../../config';
import ChangeDetails from '../ChangeDetails';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('ChangeDetails component tests', () => {
  const closeModal = jest.fn();
  const updateProfile = jest.fn();
  it('Should render component correctly', () => {
    render(<ChangeDetails
      closeModal={closeModal}
      updateProfile={updateProfile}
      currentUser={currentUser}
    />);
    const title = screen.getByText('Edit account details');
    expect(title).toBeInTheDocument();
  });

  it('Should submit form data', async () => {
    await waitFor(() => {
      mock.onPut(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_DETAILS}`, {
        username: 'newUsername',
        email: 'newEmail',
        password: 'password',
      }).reply(200, {
        success: true,
      });
    });

    render(<ChangeDetails
      closeModal={closeModal}
      updateProfile={updateProfile}
      currentUser={currentUser}
    />);

    const usernameInput = screen.getByRole('textbox', {
      name: 'Username',
    });
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    const passwordInput = screen.getByLabelText('Verify password');

    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
    fireEvent.change(emailInput, { target: { value: 'newEmail' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });

    fireEvent.click(submitButton);
  });

  it('Should catch error on submit', async () => {
    await waitFor(() => {
      mock.onPut(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_DETAILS}`, {
        username: 'newUsername',
        email: 'newEmail',
        password: 'password',
      }).reply(404, {
        success: false,
      });
    });

    render(<ChangeDetails
      closeModal={closeModal}
      updateProfile={updateProfile}
      currentUser={currentUser}
    />);

    const usernameInput = screen.getByRole('textbox', {
      name: 'Username',
    });
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    });
    const passwordInput = screen.getByLabelText('Verify password');

    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
    fireEvent.change(emailInput, { target: { value: 'newEmail' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });

    fireEvent.click(submitButton);
  });
});
