import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostMapLocation from '../PostMapLocation';

jest.mock('../MapComponent.jsx', () => () => <p>Map</p>);

describe('PostMapLocation component tests', () => {
  const getPostCoordinates = jest.fn();
  it('Should render component correctly', () => {
    render(<PostMapLocation
      countryCoordinates={{ lat: 30, lng: 35 }}
      getPostCoordinates={getPostCoordinates}
    />);
  });

  it('Should display modal', () => {
    render(<PostMapLocation
      countryCoordinates={{ lat: 30, lng: 35 }}
      getPostCoordinates={getPostCoordinates}
    />);
    const openMapButton = screen.getByRole('button', {
      name: 'Set location on map',
    });
    expect(openMapButton).toBeInTheDocument();
    fireEvent.click(openMapButton);

    const closeButton = screen.getByRole('button', {
      name: 'x',
    });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
  });
});
