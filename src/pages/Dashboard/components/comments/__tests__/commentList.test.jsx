import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentList from '../CommentList';

jest.mock('../../likes/LikesModal.jsx', () => () => <p>Likes modal</p>);

describe('Comment list component tests', () => {
  const getCommentsFromBackend = jest.fn();
  const updateComments = jest.fn();

  it('Should render correctly', () => {
    render(<CommentList
      currentUser="test"
      postUser="test"
      postId="607930931a05f60023c1ef401"
      comments={[]}
      totalResults={1}
      getCommentsFromBackend={getCommentsFromBackend}
      updateComments={updateComments}
      currentPage={1}
      likedComments={['607930931a05f60023c1ef231', '607930931a05f60023c1ef401']}
    />);
  });

  it('Should load more comments', async () => {
    const mockPost = [{
      createdDate: '2021-04-16T08:06:50.177Z',
      nrOfLikes: 1,
      postId: '607930931a05f60023c1ef40',
      text: 'New comment  !!!',
      userData: { username: 'CatUser', profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel…=media&token=cb61c8b0-489f-4d43-b1d0-67c42e5c1a23' },
      _id: '607930931a05f60023c1ef401',
    }];

    render(<CommentList
      currentUser="test"
      postUser="test"
      postId="607930931a05f60023c1ef401"
      comments={mockPost}
      totalResults={11}
      getCommentsFromBackend={getCommentsFromBackend}
      updateComments={updateComments}
      currentPage={1}
      likedComments={['607930931a05f60023c1ef121', '607930931a05f60023c1ef401']}
    />);

    const loadButton = screen.getByRole('button', {
      name: 'Load 10 more comments',
    });
    expect(loadButton).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(loadButton);
    });
  });

  it('Should render less then 10 more comments', async () => {
    const mockPost = [{
      createdDate: '2021-04-16T08:06:50.177Z',
      nrOfLikes: 1,
      postId: '607930931a05f60023c1ef40',
      text: 'New comment  !!!',
      userData: { username: 'CatUser', profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel…=media&token=cb61c8b0-489f-4d43-b1d0-67c42e5c1a23' },
      _id: '607930931a05f60023c1ef401',
    }, {
      createdDate: '2021-04-16T08:06:50.177Z',
      nrOfLikes: 1,
      postId: '607930931a05f60023c1ef40',
      text: 'New comment  !!!',
      userData: { username: 'CatUser', profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel…=media&token=cb61c8b0-489f-4d43-b1d0-67c42e5c1a23' },
      _id: '607930931a05f60023c1ef401',
    }];

    render(<CommentList
      currentUser="test"
      postUser="test"
      postId="607930931a05f60023c1ef401"
      comments={mockPost}
      totalResults={11}
      getCommentsFromBackend={getCommentsFromBackend}
      updateComments={updateComments}
      currentPage={1}
      likedComments={['607930931a05f60023c1ef401']}
    />);

    const loadButton = screen.getByRole('button', {
      name: 'Load 9 more comments',
    });
    expect(loadButton).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(loadButton);
    });
  });
});
