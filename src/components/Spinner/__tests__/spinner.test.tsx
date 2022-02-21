import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../Spinner';

describe('Spinner component tests', () => {
  it('Should render component correctly', () => {
    render(
      <Spinner />,
    );
  });
});
