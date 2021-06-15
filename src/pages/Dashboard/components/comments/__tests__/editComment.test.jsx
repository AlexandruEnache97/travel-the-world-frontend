import React from 'react';
import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NODE_SERVER } from '../../../../../../config';
import EditComment from '../EditComment';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Comment list component tests', () => {
  const setEditMode = jest.fn();
  const getEditedText = jest.fn();
  const setLoadingAction = jest.fn();

  it('Should render correctly', () => {
    render(<EditComment
      text="textareaInput"
      commentId="1"
      setEditMode={setEditMode}
      getEditedText={getEditedText}
      setLoadingAction={setLoadingAction}
    />);

    const textarea = screen.getByRole('textbox', {
      name: '',
    });
    expect(textarea).toHaveTextContent('textareaInput');
  });

  it('Should edit comment text', () => {
    render(<EditComment
      text="textareaInput"
      commentId="1"
      setEditMode={setEditMode}
      getEditedText={getEditedText}
      setLoadingAction={setLoadingAction}
    />);
    const textarea = screen.getByRole('textbox', {
      name: '',
    });

    fireEvent.change(textarea, { target: { value: 'newInput' } });
    expect(textarea).toHaveTextContent('newInput');
  });

  it('Should submit edited text', async () => {
    await waitFor(() => {
      mock.onPut(`${NODE_SERVER.baseUrl}/api/editComment`, { text: 'newInput', commentId: '1' }).reply(200, {
        results: {
          success: true,
        },
      });
    });

    render(<EditComment
      text="textareaInput"
      commentId="1"
      setEditMode={setEditMode}
      getEditedText={getEditedText}
      setLoadingAction={setLoadingAction}
    />);
    const textarea = screen.getByRole('textbox', {
      name: '',
    });

    fireEvent.change(textarea, { target: { value: 'newInput' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
  });

  it('Should cancel edit on escape key', async () => {
    render(<EditComment
      text="textareaInput"
      commentId="1"
      setEditMode={setEditMode}
      getEditedText={getEditedText}
      setLoadingAction={setLoadingAction}
    />);
    const textarea = screen.getByRole('textbox', {
      name: '',
    });

    fireEvent.change(textarea, { target: { value: 'newInput' } });
    fireEvent.keyDown(textarea, { key: 'Escape', code: 'Escape' });
  });
});
