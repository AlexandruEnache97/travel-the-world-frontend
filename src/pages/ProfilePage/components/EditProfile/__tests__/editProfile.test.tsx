import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfile from '../EditProfile';
import { currentUser } from '../../../../../utils/unitTesting';

describe('EditProfile component tests', () => {
  const closeModal = jest.fn();
  const updateProfile = jest.fn();
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(<EditProfile
      closeModal={closeModal}
      updateProfile={updateProfile}
      currentUser={currentUser}
      createAlert={createAlert}
    />);
    const title = screen.getByText('Edit profile');
    expect(title).toBeInTheDocument();
  });
});
