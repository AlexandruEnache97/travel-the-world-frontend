import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PostHeader from '../PostHeader';

describe('PostHeader component tests', () => {
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <PostHeader
          userData={{
            username: 'Alex',
            profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
          }}
          postId="1"
          saved
          createAlert={createAlert}
        />
      </MemoryRouter>,
    );
  });

  it('Should save post bookmark', () => {
    render(
      <MemoryRouter>
        <PostHeader
          userData={{
            username: 'Alex',
            profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
          }}
          postId="1"
          saved={false}
          createAlert={createAlert}
        />
      </MemoryRouter>,
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
    fireEvent.click(savedBookmarkImage);
  });
});
