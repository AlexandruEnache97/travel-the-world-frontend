import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostControls from '../PostControls';

jest.mock('../../../comments/ConnectedCommentsModal.jsx', () => () => <p>Comments</p>);

describe('PostControls component tests', () => {
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(
      <PostControls
        id="1"
        createAlert={createAlert}
        likes={0}
        shares={0}
        username="Alex"
        title="Post"
      />,
    );
    const likesButton = screen.getByRole('button', {
      name: '0 likes',
    });
    expect(likesButton).toBeInTheDocument();
  });

  it('Should open/close like modal', () => {
    render(
      <PostControls
        id="1"
        createAlert={createAlert}
        likes={1}
        shares={0}
        username="Alex"
        title="Post"
      />,
    );
    const likesButton = screen.getByRole('button', {
      name: '1 like',
    });
    fireEvent.click(likesButton);
    const titleModal = screen.getByText('Post - 1 like');
    expect(titleModal).toBeInTheDocument();

    const closeModal = screen.getByRole('button', {
      name: 'x',
    });
    fireEvent.click(closeModal);
  });

  it('Should like/unlike post', () => {
    render(
      <PostControls
        id="1"
        createAlert={createAlert}
        likes={1}
        shares={0}
        username="Alex"
        title="Post"
      />,
    );
    const likes = screen.getByRole('button', {
      name: '1 like',
    });
    const likeButton = screen.getByRole('button', {
      name: 'likeIcon',
    });
    expect(likeButton).toBeInTheDocument();
    fireEvent.click(likeButton);
    expect(likes).toContainHTML('2 likes');
    fireEvent.click(likeButton);
    expect(likes).toContainHTML('1 like');
  });

  it('Should open comments for current post', () => {
    render(
      <PostControls
        id="1"
        createAlert={createAlert}
        likes={1}
        shares={0}
        username="Alex"
        title="Post"
      />,
    );
    const comments = screen.getByRole('button', {
      name: 'commentsIcon',
    });
    expect(comments).toBeInTheDocument();
    fireEvent.click(comments);
    const commentInput = screen.getByText('Comments');
    expect(commentInput).toBeInTheDocument();
  });
});
