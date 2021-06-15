import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfile from '../EditProfile';
import { currentUser } from '../../../../../utils/unitTesting';

jest.mock('../ConnectedChangeImage.jsx', () => () => <p>Change Image</p>);

describe('EditProfile component tests', () => {
  const closeModal = jest.fn();
  const updateProfile = jest.fn();
  it('Should render component correctly', () => {
    render(<EditProfile
      closeModal={closeModal}
      updateProfile={updateProfile}
      currentUser={currentUser}
    />);
    const title = screen.getByText('Edit profile');
    expect(title).toBeInTheDocument();
  });
});
