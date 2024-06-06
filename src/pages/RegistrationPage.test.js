import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

// Mock the window.alert function
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('RegistrationPage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders RegistrationPage component', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    // Query the heading with role and name
    const headingElement = screen.getByRole('heading', { name: /Register/i });
    expect(headingElement).toBeInTheDocument();
    // Query the input fields by data-testid
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('surname-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('gender-input')).toBeInTheDocument();
  });

  test('successful registration', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    // Input registration details
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('surname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('gender-input'), { target: { value: 'male' } });

    // Click register button
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Check if the user was successfully registered
    const users = JSON.parse(localStorage.getItem('users'));
    expect(users).toEqual([
      { name: 'John', surname: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password', gender: 'male' }
    ]);
  });

  test('navigate to login page', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    // Click "Back to Login" button
    fireEvent.click(screen.getByRole('button', { name: /Back to Login/i }));

    // Check if the URL changed to /
    expect(window.location.pathname).toBe('/');
  });
});
