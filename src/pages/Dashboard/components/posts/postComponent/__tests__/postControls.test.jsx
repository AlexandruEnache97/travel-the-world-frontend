import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostControls from '../PostControls';

describe('PostControls component tests', () => {
  const createAlert = jest.fn();
  it('Should render component correctly', () => {
    render(
      <PostControls
        id='1'
        createAlert={createAlert}
        likes={0}
        shares={0}
        username='Alex'
        title='Post'
      />,
    );
  });
});