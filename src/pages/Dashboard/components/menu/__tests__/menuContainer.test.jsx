import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MenuContainer from '../MenuContainer';

jest.mock('../../../../../images/menuButtons/mapIcon.png', () => 'mapIcon.png');

describe('MenuContainer component tests', () => {
  it('Should render component correctly', () => {
    render(
      <MemoryRouter>
        <MenuContainer
          currentUser={{
            username: 'Alex',
            email: 'alex@gmail.com',
            profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
            country: 'Romania',
            userLocation: {
              lat: 36,
              lng: 32,
            },
          }}
        />
      </MemoryRouter>,
    );
    const profileButton = screen.getByRole('link', {
      name: 'https://img.icons8.com/carbon-copy/100/000000/map.png Alex',
    });
    expect(profileButton).toBeInTheDocument();
  });

  it('Should hide menu on mobile', () => {
    global.innerWidth = 500;
    render(
      <MemoryRouter>
        <MenuContainer
          currentUser={{
            username: 'Alex',
            email: 'alex@gmail.com',
            profileImage: 'https://img.icons8.com/carbon-copy/100/000000/map.png',
            country: 'Romania',
            userLocation: {
              lat: 36,
              lng: 32,
            },
          }}
        />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole('button', {
      name: 'Menu',
    });
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);
    const profileButton = screen.getByRole('link', {
      name: 'https://img.icons8.com/carbon-copy/100/000000/map.png Alex',
    });
    expect(profileButton).toBeInTheDocument();
  });
});
