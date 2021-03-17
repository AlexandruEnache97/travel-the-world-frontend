import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';

describe('Dashboard component tests', () => {
  it('Should render component correctly', () => {
    const auth = { accountData: { username: 'Alex' } };
    render(<Dashboard auth={auth} />);
    expect(screen.getByText('Welcome Alex')).toBeInTheDocument();
  });
});
