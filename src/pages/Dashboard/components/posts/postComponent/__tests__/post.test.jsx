import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from '../Post';
import { singlePost } from '../../../../../../utils/unitTesting';

describe('Post component tests', () => {
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(
      <Post
        post={singlePost}
        createAlert={createAlert}
      />,
    );
  });
});
