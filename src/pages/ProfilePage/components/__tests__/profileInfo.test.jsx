import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileInfo from '../ProfileInfo';
import { currentUser } from '../../../../utils/unitTesting';

jest.mock('../EditProfile/ConnectedEditProfile.jsx', () => () => <p>Edit Profile</p>);

describe('ProfileInfo component tests', () => {
  const updateInfo = jest.fn();
  const showSavedPosts = jest.fn();
  it('Should render component correctly', () => {
    render(
      <div id="main-page">
        <ProfileInfo
          currentUser={currentUser}
          updateInfo={updateInfo}
          showSavedPosts={showSavedPosts}
        />
      </div>,
    );
  });

  it('Should handle posts saved button', () => {
    render(
      <div id="main-page">
        <ProfileInfo
          currentUser={currentUser}
          updateInfo={updateInfo}
          showSavedPosts={showSavedPosts}
        />
      </div>,
    );

    const changeToSavePosts = screen.getByRole('button', { name: 'Edit profile' });
    fireEvent.click(changeToSavePosts);
  });
});
