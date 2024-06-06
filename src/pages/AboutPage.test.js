import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  beforeEach(() => {
    // Set up user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify({ name: 'John' }));
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  test('renders AboutPage component', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('about-title')).toHaveTextContent('About');
    expect(screen.getByTestId('about-description')).toHaveTextContent(
      'This is a simple phone book application built with ReactJS and MaterialUI.'
    );
    expect(screen.getByTestId('about-features')).toHaveTextContent('Features include:');
    expect(screen.getByTestId('about-features')).toHaveTextContent('User registration and login');
    expect(screen.getByTestId('about-features')).toHaveTextContent('Profile management');
    expect(screen.getByTestId('about-features')).toHaveTextContent('Phone book with add, edit, and delete functionalities');
    expect(screen.getByTestId('about-features')).toHaveTextContent('Sorting and grouping of contacts');
  });

  test('handles logout', async () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => {
      expect(localStorage.getItem('loggedInUser')).toBeNull();
      expect(window.location.pathname).toBe('/');
    });
  });
});
