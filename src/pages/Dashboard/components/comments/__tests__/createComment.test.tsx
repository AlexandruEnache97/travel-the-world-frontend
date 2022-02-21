import * as React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import CreateComment from '../CreateComment';
import '@testing-library/jest-dom';
import { NODE_SERVER } from '../../../../../../config';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Create comment component test', () => {
  it('Test createComment', async () => {
    const getCommentsFromBackend = jest.fn();
    render(<CreateComment postId="1" getCommentsFromBackend={getCommentsFromBackend} />);

    mock.onPut(`${NODE_SERVER.baseUrl}/api/createComment`).reply(200, {
      text: 'comment',
      postId: '1',
    });
    const textarea = screen.getByRole('textbox', {
      name: '',
    });
    expect(textarea).toBeInTheDocument();
    expect(textarea.innerHTML).toEqual('');

    fireEvent.change(textarea, { target: { value: 'text' } });
    expect(textarea.innerHTML).toEqual('text');

    const emojiButton = screen.getByRole('button', {
      name: 'emoji',
    });
    expect(emojiButton).toBeInTheDocument();
    fireEvent.click(emojiButton);

    const emoji = screen.getAllByRole('button', {
      name: '',
    });
    fireEvent.click(emoji[20]);

    await waitFor(() => {
      fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    });
    expect(getCommentsFromBackend).toBeCalled();
  });
});
