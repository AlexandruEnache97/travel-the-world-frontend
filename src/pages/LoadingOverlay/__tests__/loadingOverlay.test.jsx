import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingOverlay from '../LoadingOverlay';

describe('Loading Overlay component tests', () => {
  it('Should render null with empty state', () => {
    render(<LoadingOverlay loading={{ loadingState: [] }} />);
    const loadingSpinner = screen.queryByTestId('spinner');
    expect(loadingSpinner).toBeNull();
  });
  it('Should render null with empty state', () => {
    render(<LoadingOverlay loading={{ loadingState: ['SIGN_IN'] }} />);
    const loadingSpinner = screen.getByTestId('spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
