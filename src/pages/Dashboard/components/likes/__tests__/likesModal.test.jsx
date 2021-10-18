import React from 'react';
import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { NODE_SERVER } from '../../../../../../config';
import { getUserLikes } from '../../../../../service/postsApi';
import LikesModalComponent from '../LikesModal';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('LikesModal component tests', () => {
  const closeHandler = jest.fn();

  it('Should render component correctly', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/userLikes/1/1`).reply(200, {
        userLikes: [{
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }],
      });
      render(
        <MemoryRouter>
          <LikesModalComponent
            title="post"
            likes={23}
            postId="1"
            closeHandler={closeHandler}
            getLikes={getUserLikes}
          />
          ,
        </MemoryRouter>,
      );
    });

    const title = screen.getByText('post - 23 likes');
    expect(title).toBeInTheDocument();
  });

  it('Should load more likes over 10', async () => {
    await waitFor(() => {
      mock.onGet(`${NODE_SERVER.baseUrl}/api/userLikes/1/1`).reply(200, {
        userLikes: [{
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }],
      });
      mock.onGet(`${NODE_SERVER.baseUrl}/api/userLikes/1/2`).reply(200, {
        userLikes: [{
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }, {
          username: 'CatUser',
          profileImage: '1',
          _id: '1',
        }],
      });

      render(
        <MemoryRouter>
          <LikesModalComponent
            title="post"
            likes={21}
            postId="1"
            closeHandler={closeHandler}
            getLikes={getUserLikes}
          />
        </MemoryRouter>,
      );
    });

    const moreLikesButton = screen.getByRole('button', {
      name: 'Load 10 more likes',
    });
    expect(moreLikesButton).toBeInTheDocument();
    fireEvent.click(moreLikesButton);
  });
});
