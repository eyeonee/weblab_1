import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhoneBookPage from './PhoneBookPage';

describe('PhoneBookPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders PhoneBookPage component', () => {
    render(
      <BrowserRouter>
        <PhoneBookPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('phonebook-title')).toHaveTextContent('Phone Book');
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('adds a contact', () => {
    render(
      <BrowserRouter>
        <PhoneBookPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('surname-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  test('edits a contact', async () => {
    localStorage.setItem('contacts', JSON.stringify([{ id: 1, name: 'John', surname: 'Doe', phone: '1234567890' }]));

    render(
      <BrowserRouter>
        <PhoneBookPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('edit-button-1'));

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('surname-input'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '0987654321' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('0987654321')).toBeInTheDocument();
    });
  });

  test('deletes a contact', () => {
    localStorage.setItem('contacts', JSON.stringify([{ id: 1, name: 'John', surname: 'Doe', phone: '1234567890' }]));

    render(
      <BrowserRouter>
        <PhoneBookPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('delete-button-1'));

    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.queryByText('1234567890')).toBeNull();
  });

  test('searches for a contact', () => {
    localStorage.setItem('contacts', JSON.stringify([
      { id: 1, name: 'John', surname: 'Doe', phone: '1234567890' },
      { id: 2, name: 'Jane', surname: 'Smith', phone: '0987654321' }
    ]));

    render(
      <BrowserRouter>
        <PhoneBookPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Jane' } });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).toBeNull();
  });
});
