import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  const user = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    gender: 'male'
  };

  beforeEach(() => {
    // Set up user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  test('renders ProfilePage component', () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toHaveTextContent(`Name: ${user.name}`);
    expect(screen.getByTestId('user-surname')).toHaveTextContent(`Surname: ${user.surname}`);
    expect(screen.getByTestId('user-email')).toHaveTextContent(`Email: ${user.email}`);
    expect(screen.getByTestId('user-phone')).toHaveTextContent(`Phone: ${user.phone}`);
    expect(screen.getByTestId('user-gender')).toHaveTextContent(`Gender: ${user.gender}`);
  });

  test('handles logout', async () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText(/Logout/i)[0]);

    await waitFor(() => {
      expect(localStorage.getItem('loggedInUser')).toBeNull();
      expect(window.location.pathname).toBe('/');
    });
  });
});
