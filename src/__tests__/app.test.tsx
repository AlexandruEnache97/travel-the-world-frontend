import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';

describe('App component tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
});
