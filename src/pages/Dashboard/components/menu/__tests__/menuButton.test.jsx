import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MenuButton from '../MenuButton';

describe('MenuButton component tests', () => {
  it('Should render normal button', () => {
    render(
      <MemoryRouter>
        <MenuButton
          image="https://img.icons8.com/carbon-copy/100/000000/map.png"
          text="Map"
          redirect="/map"
        />
      </MemoryRouter>,
    );
  });

  it('Should render profile button', () => {
    render(
      <MemoryRouter>
        <MenuButton
          image="https://img.icons8.com/carbon-copy/100/000000/map.png"
          text="Map"
          redirect="/map"
          isProfile
        />
      </MemoryRouter>,
    );
  });
});
