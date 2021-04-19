import React from 'react';
import { act, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CommentsModal from '../CommentsModal';
import { NODE_SERVER } from '../../../../../../config';

const auth = {
  accountData: {
    username: 'test',
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

const mockPost = {
  createdDate: '2021-04-16T08:06:50.177Z',
  nrOfLikes: 1,
  postId: '607930931a05f60023c1ef40',
  text: 'New comment  !!!',
  userData: { username: 'CatUser', profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel…=media&token=cb61c8b0-489f-4d43-b1d0-67c42e5c1a23' },
  _id: '6079459a8c0bc9002321006f',
};

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Comments modal tests', () => {
  it('Test get comments from backend', () => {
    act(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/likedComments/1/1`).reply(200, [
        '6079459a8c0bc9002321006f',
      ]);
      mock.onGet(`${NODE_SERVER.baseUrl}/api/likedComments/1/1`).reply(200, {
        data: mockPost,
      });
      render(<CommentsModal postId="1" auth={auth} postUser="test2" />);
    });
  });
});
