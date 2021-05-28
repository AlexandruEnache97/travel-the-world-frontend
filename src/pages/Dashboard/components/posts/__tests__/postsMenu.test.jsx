import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currentUser } from '../../../../../utils/unitTesting';
import PostsMenu from '../PostsMenu';

describe('PostMenu component tests', () => {
  const createPost = jest.fn();
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(
      <PostsMenu
        currentUser={currentUser}
        createPost={createPost}
        createAlert={createAlert}
      />,
    );
  });

  it('Should handle create post modal', () => {
    render(
      <PostsMenu
        currentUser={currentUser}
        createPost={createPost}
        createAlert={createAlert}
      />,
    );
    const createButton = screen.getByRole('button', {
      name: 'Create new post',
    });
    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton);
  });
});
