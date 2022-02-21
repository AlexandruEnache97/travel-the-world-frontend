import * as React from 'react';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPosts from '../SearchPosts';

describe('SearchPosts component tests', () => {
  it('Should render component correctly', () => {
    render(<SearchPosts />);

    const inputSearch = screen.getByRole('textbox', {
      name: '',
    });
    expect(inputSearch).toBeInTheDocument();
  });

  it('Should handle search change input', () => {
    render(<SearchPosts />);

    const inputSearch = screen.getByRole('textbox', {
      name: '',
    });
    fireEvent.change(inputSearch, { target: { value: 'Search' } });
    expect(inputSearch).toHaveValue('Search');
  });
});
