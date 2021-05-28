import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../Alert';

describe('Alert component tests', () => {
  it('Should render correctly', async () => {
    const removeAlert = jest.fn();
    render(<Alert removeAlert={removeAlert} alert={{ active: true, message: 'Alert' }} />);

    const alertMessage = screen.getByText('Alert');
    expect(alertMessage).toBeInTheDocument();

    const closeButton = screen.getByRole('button', {
      name: 'x',
    });
    expect(closeButton).toBeInTheDocument();
  });

  it('Should remove alert on close button', () => {
    const removeAlert = jest.fn();
    render(<Alert removeAlert={removeAlert} alert={{ active: true, message: 'Alert' }} />);

    const closeButton = screen.getByRole('button', {
      name: 'x',
    });
    fireEvent.click(closeButton);

    expect(removeAlert).toBeCalled();
  });
});
