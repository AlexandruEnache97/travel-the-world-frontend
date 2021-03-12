import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logoHeader = screen.getByAltText('logoHeader');
    expect(logoHeader).toBeInTheDocument();
  });
});
