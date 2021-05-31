import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostHeader from '../PostHeader';

describe('PostHeader component tests', () => {
  it('Should render component correctly', () => {
    render(
      <PostHeader
        userData={{
          username: 'Alex',
          profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
        }}
      />,
    );
  });

  it('Should save post bookmark', () => {
    render(
      <PostHeader
        userData={{
          username: 'Alex',
          profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
        }}
      />,
    );
    const bookmarkImage = screen.getByRole('img', {
      name: 'bookmark',
    });
    expect(bookmarkImage).toBeInTheDocument();
    const saveButton = screen.getByRole('button', {
      name: 'bookmark',
    });
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    const savedBookmarkImage = screen.getByRole('img', {
      name: 'saved-bookmark',
    });
    expect(savedBookmarkImage).toBeInTheDocument();
  });
});
