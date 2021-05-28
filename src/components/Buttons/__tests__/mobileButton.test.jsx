import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileButton from '../MobileButton';

describe('Mobile button component tests', () => {
  it('Should render correctly', () => {
    const mobileMenuHandler = jest.fn();
    render(<MobileButton mobileMenuHandler={mobileMenuHandler} />);

    const button = screen.getByRole('button', {
      name: 'Menu',
    });
    expect(button).toBeInTheDocument();
  });

  it('Should handle button click', () => {
    const mobileMenuHandler = jest.fn();
    render(<MobileButton mobileMenuHandler={mobileMenuHandler} />);

    const button = screen.getByRole('button', {
      name: 'Menu',
    });

    fireEvent.click(button);
    expect(button).toHaveClass('mobile-button menu-open');
    fireEvent.click(button);
    expect(button).toHaveClass('mobile-button');
  });
});
