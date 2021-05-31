import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CommentsModal from '../CommentsModal';
import { NODE_SERVER } from '../../../../../../config';

const auth = {
  accountData: {
    username: 'CatUser',
    email: 'test@gmail.com',
    country: 'France',
    profileImage: 'link',
    userLocation: {
      lat: 0,
      lng: 0,
    },
  },
  accountId: '1',
  isAuthenticated: true,
};

const mockPost = [{
  createdDate: '2021-04-16T08:06:50.177Z',
  nrOfLikes: 1,
  postId: '607930931a05f60023c1ef40',
  text: 'New comment  !!!',
  userData: { username: 'CatUser', profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel…=media&token=cb61c8b0-489f-4d43-b1d0-67c42e5c1a23' },
  _id: '6079459a8c0bc9002321006f',
}];

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Comments modal tests', () => {
  it('Test get comments from backend', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/getComments/607930931a05f60023c1ef40/1`).reply(200, {
        results: mockPost,
        totalResults: 11,
      });
      mock.onGet(`${NODE_SERVER.baseUrl}/api/likedComments/607930931a05f60023c1ef40/1`).reply(200, {
        likedComments: [
          '6079459a8c0bc9002321006f',
          '6079459a8c0bc900232100gg',
        ],
      });
      mock.onDelete(`${NODE_SERVER.baseUrl}/api/deleteComment`).reply(200);
      render(<CommentsModal postId="607930931a05f60023c1ef40" auth={auth} postUser="test2" />);
    });
  });
  it('Should catch empty result from backend', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/getComments/1/1`).reply(404);
      render(<CommentsModal postId="1" auth={auth} postUser="test2" />);
    });
  });

  it('Should delete comment from post', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/getComments/607930931a05f60023c1ef40/1`).reply(200, {
        results: mockPost,
        totalResults: 11,
      });
      mock.onGet(`${NODE_SERVER.baseUrl}/api/likedComments/607930931a05f60023c1ef40/1`).reply(200, {
        likedComments: [
          '6079459a8c0bc9002321006f',
          '6079459a8c0bc900232100gg',
        ],
      });
      mock.onDelete(`${NODE_SERVER.baseUrl}/api/deleteComment`).reply(200);
      render(<CommentsModal postId="607930931a05f60023c1ef40" auth={auth} postUser="test2" />);

      const deleteComment = screen.getByRole('button', {
        name: 'Delete',
      });
      expect(deleteComment).toBeInTheDocument();
      fireEvent.click(deleteComment);
    });
  });

  it('Should delete last comment from post', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/getComments/607930931a05f60023c1ef40/1`).reply(200, {
        results: mockPost,
        totalResults: 1,
      });
      mock.onGet(`${NODE_SERVER.baseUrl}/api/likedComments/607930931a05f60023c1ef40/1`).reply(200, {
        likedComments: [
          '6079459a8c0bc9002321006f',
          '6079459a8c0bc900232100gg',
        ],
      });
      mock.onDelete(`${NODE_SERVER.baseUrl}/api/deleteComment`).reply(200);
      render(<CommentsModal postId="607930931a05f60023c1ef40" auth={auth} postUser="test2" />);

      const deleteComment = screen.getByRole('button', {
        name: 'Delete',
      });
      expect(deleteComment).toBeInTheDocument();
      fireEvent.click(deleteComment);
    });
  });
});
