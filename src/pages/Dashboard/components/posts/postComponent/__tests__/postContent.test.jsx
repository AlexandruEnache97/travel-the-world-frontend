import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostContent from '../PostContent';

jest.mock('../../showPostMap/MapModal.jsx', () => () => <p>Map modal</p>);

describe('PostContent component tests', () => {
  it('Should render component correctly', () => {
    render(
      <PostContent
        title="Post"
        text="Post text"
        postImage="https://img.icons8.com/carbon-copy/100/000000/map.png"
        location="Website"
        createdDate="01302020"
        country="Romania"
        category="Website"
        coordinates={{
          lat: 0,
          lng: 0,
        }}
      />,
    );
    const postImage = screen.getByAltText('postImage');
    expect(postImage).toBeInTheDocument();
  });

  it('Should open map modal', () => {
    render(
      <PostContent
        title="Post"
        text="Post text"
        postImage="https://img.icons8.com/carbon-copy/100/000000/map.png"
        location="Website"
        createdDate="01302020"
        country="Romania"
        category="Website"
        coordinates={{
          lat: 0,
          lng: 0,
        }}
      />,
    );
    const mapButton = screen.getByRole('button', {
      name: 'locationIcon Website, Romania',
    });
    expect(mapButton).toBeInTheDocument();
    fireEvent.click(mapButton);
  });
});
