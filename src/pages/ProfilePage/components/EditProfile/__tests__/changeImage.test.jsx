import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangeImage from '../ChangeImage';

import Image from '../../../../../images/profilePage/ProfileBanner.svg';

describe('ChangeImage component tests', () => {
  const closeModal = jest.fn();
  const updateProfile = jest.fn();
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(<ChangeImage
      closeModal={closeModal}
      updateProfile={updateProfile}
      createAlert={createAlert}
    />);

    const imageInput = screen.getByLabelText('Change profile image');
    expect(imageInput).toBeInTheDocument();

    const uploadButton = screen.getByRole('button', {
      name: 'Done',
    });
    expect(uploadButton).toBeInTheDocument();
  });

  it('Should upload image', async () => {
    render(<ChangeImage
      closeModal={closeModal}
      updateProfile={updateProfile}
      createAlert={createAlert}
    />);

    const imageInput = screen.getByLabelText('Change profile image');
    fireEvent.change(imageInput, { target: { files: [Image] } });

    const uploadButton = screen.getByRole('button', {
      name: 'Done',
    });
    await waitFor(() => {
      fireEvent.click(uploadButton);
    });
  });
});
