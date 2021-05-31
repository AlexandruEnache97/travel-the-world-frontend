import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NODE_SERVER } from '../../../../../../config';
import { getUserLikes } from '../../../../../service/postsApi';
import LikesModal from '../LikesModal';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('LikesModal component tests', () => {
  const closeHandler = jest.fn();
  const getLikes = jest.fn();

  it('Should render component correctly', () => {
    render(
      <LikesModal
        title="post"
        likes={1}
        postId="1"
        closeHandler={closeHandler}
        getLikes={getLikes}
      />,
    );
    const title = screen.getByText('post - 1 like');
    expect(title).toBeInTheDocument();
  });

  it('Should load more likes over 10', async () => {
    await waitFor(() => {
      const info = mock.onGet(`${NODE_SERVER.baseUrl}/api/userLikes/1/1`).reply(200, {
        data:
        {
          userLikes:
            [{
              username: 'CatUser',
              profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/profiles%2Ffa64a2c4833d54807c6921ecd9b273a8.jpg?alt=media&token=cedb979a-3051-4fe1-b596-1b91cabd477a',
            }, {
              profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/profiles%2Fprofile.png?alt=media&token=3b714e3c-7771-4d64-bc94-6b6cf1529ee1',
              username: 'gigi',
            }, {
              profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/profiles%2Fprofile.png?alt=media&token=9fc76fd9-5c3d-4065-9710-9ad3e4c027cd',
              username: 'test1',
            }, {
              profileImage: 'https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/profiles%2Fman-avatar-profile-vector-21372076.jpg?alt=media&token=e247660a-c6ca-4a74-b4c8-bcf76da5b339',
              username: 'marcel',
            }],
        },
      });
      console.log(info.get);
    });
    render(
      <LikesModal
        title="post"
        likes={11}
        postId="1"
        closeHandler={closeHandler}
        getLikes={getUserLikes}
      />,
    );
    screen.debug();
  });
});
