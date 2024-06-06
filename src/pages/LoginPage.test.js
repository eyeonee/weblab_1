import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

// Mock the window.alert function
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('LoginPage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders LoginPage component', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    // Query the heading with role and name
    const headingElement = screen.getByRole('heading', { name: /Login/i });
    expect(headingElement).toBeInTheDocument();
    // Query the email and password input fields by label
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('successful login', () => {
    // Set up localStorage with a user
    const users = [{ email: 'test@example.com', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Input email and password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Click login button
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if the user was successfully logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    expect(loggedInUser).toEqual({ email: 'test@example.com', password: 'password' });
  });

  test('failed login with incorrect credentials', () => {
    // Set up localStorage with a user
    const users = [{ email: 'test@example.com', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Input incorrect email and password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

    // Click login button
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check if alert was called
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });

  test('navigate to registration page', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Click register button
    fireEvent.click(screen.getByRole('button', { name: /Don't have an account\? Register/i }));

    // Check if the URL changed to /register
    expect(window.location.pathname).toBe('/register');
  });
});
