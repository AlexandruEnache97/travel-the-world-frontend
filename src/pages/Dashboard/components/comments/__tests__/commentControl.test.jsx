import React from 'react';
import {
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentControl from '../CommentControl';

describe('Comment list component tests', () => {
  const deletePostComment = jest.fn();

  it('Should render correctly', () => {
    render(<CommentControl deletePostComment={deletePostComment} />);
  });
});
