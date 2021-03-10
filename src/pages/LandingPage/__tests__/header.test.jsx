import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header tests', () => {
  it('Should render component correctly', () => {
    render(<Header />);

    const logoHeader = screen.getByAltText('logoHeader');
    expect(logoHeader).toBeInTheDocument();
  });
});
