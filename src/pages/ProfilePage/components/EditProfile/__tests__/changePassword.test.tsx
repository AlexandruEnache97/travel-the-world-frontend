import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NODE_SERVER, AUTH_ROUTES } from '../../../../../../config';
import ChangePassword from '../ChangePassword';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('ChangePassword component tests', () => {
  const updateProfile = jest.fn();
  const closeModal = jest.fn();
  const createAlert = jest.fn();

  it('Should render component correctly', () => {
    render(<ChangePassword
      updateProfile={updateProfile}
      closeModal={closeModal}
      createAlert={createAlert}
    />);

    const oldPassword = screen.getByLabelText('Old password');
    expect(oldPassword).toBeInTheDocument();

    const newPassword = screen.getByLabelText('New password');
    expect(newPassword).toBeInTheDocument();

    const verifyNewPassword = screen.getByLabelText('Verify password');
    expect(verifyNewPassword).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('Should handle error different passwords', () => {
    render(<ChangePassword
      updateProfile={updateProfile}
      closeModal={closeModal}
      createAlert={createAlert}
    />);

    const oldPassword = screen.getByLabelText('Old password');
    const newPassword = screen.getByLabelText('New password');
    const verifyNewPassword = screen.getByLabelText('Verify password');

    fireEvent.change(oldPassword, { target: { value: 'oldPassword' } });
    fireEvent.change(newPassword, { target: { value: 'password' } });
    fireEvent.change(verifyNewPassword, { target: { value: 'password2' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });
    fireEvent.click(submitButton);
    expect(createAlert).toBeCalledWith('New passwords does not match', 3);
  });

  it('Should handler error same password', () => {
    render(<ChangePassword
      updateProfile={updateProfile}
      closeModal={closeModal}
      createAlert={createAlert}
    />);

    const oldPassword = screen.getByLabelText('Old password');
    const newPassword = screen.getByLabelText('New password');
    const verifyNewPassword = screen.getByLabelText('Verify password');

    fireEvent.change(oldPassword, { target: { value: 'oldPassword' } });
    fireEvent.change(newPassword, { target: { value: 'oldPassword' } });
    fireEvent.change(verifyNewPassword, { target: { value: 'oldPassword' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });
    fireEvent.click(submitButton);
    expect(createAlert).toBeCalledWith('New password must be different from the old one', 3);
  });

  it('Should handle password changed', async () => {
    await waitFor(() => {
      mock.onPut(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PASSWORD}`, {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      }).reply(200, {
        success: true,
      });
    });

    render(<ChangePassword
      updateProfile={updateProfile}
      closeModal={closeModal}
      createAlert={createAlert}
    />);

    const oldPassword = screen.getByLabelText('Old password');
    const newPassword = screen.getByLabelText('New password');
    const verifyNewPassword = screen.getByLabelText('Verify password');

    fireEvent.change(oldPassword, { target: { value: 'oldPassword' } });
    fireEvent.change(newPassword, { target: { value: 'newPassword' } });
    fireEvent.change(verifyNewPassword, { target: { value: 'newPassword' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(updateProfile).toBeCalled();
    expect(closeModal).toBeCalled();
    expect(createAlert).toBeCalledWith('Password changed', 3);
  });

  it('Should handle password changed server error', async () => {
    await waitFor(() => {
      mock.onPut(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PASSWORD}`, {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      }).reply(404, {
        success: false,
      });
    });

    render(<ChangePassword
      updateProfile={updateProfile}
      closeModal={closeModal}
      createAlert={createAlert}
    />);

    const oldPassword = screen.getByLabelText('Old password');
    const newPassword = screen.getByLabelText('New password');
    const verifyNewPassword = screen.getByLabelText('Verify password');

    fireEvent.change(oldPassword, { target: { value: 'oldPassword' } });
    fireEvent.change(newPassword, { target: { value: 'newPassword' } });
    fireEvent.change(verifyNewPassword, { target: { value: 'newPassword' } });

    const submitButton = screen.getByRole('button', {
      name: 'Done',
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(createAlert).toBeCalledWith('Old password incorrect', 3);
  });
});
