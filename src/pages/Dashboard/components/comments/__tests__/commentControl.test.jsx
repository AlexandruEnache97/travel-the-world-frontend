import React from 'react';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentControl from '../CommentControl';

describe('Comment list component tests', () => {
  const deletePostComment = jest.fn();

  it('Should render correctly', () => {
    render(<CommentControl deletePostComment={deletePostComment} />);

    const controlButton = screen.getByRole('button', {
      name: '...',
    });
    expect(controlButton).toBeInTheDocument();
  });

  it('Should activate control modal and delete comment', () => {
    render(<CommentControl deletePostComment={deletePostComment} />);

    const controlButton = screen.getByRole('button', {
      name: '...',
    });

    fireEvent.click(controlButton);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete',
    });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(deletePostComment).toBeCalled();
  });
});
