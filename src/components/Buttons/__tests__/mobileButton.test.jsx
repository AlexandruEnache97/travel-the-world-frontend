import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileButton from '../MobileButton';

describe('Mobile button component tests', () => {
  it('Should render correctly', () => {
    const getMobileMenu = jest.fn();
    render(<MobileButton getMobileMenu={getMobileMenu} />);

    const button = screen.getByRole('button', {
      name: 'open-button',
    });
    expect(button).toBeInTheDocument();
  });

  it('Should handle button click', () => {
    const getMobileMenu = jest.fn();
    render(<MobileButton getMobileMenu={getMobileMenu} />);

    const button = screen.getByRole('button', {
      name: 'open-button',
    });
    fireEvent.click(button);
  });
});
