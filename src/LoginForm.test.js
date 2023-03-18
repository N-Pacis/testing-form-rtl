import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders with empty input fields', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('updates email value when user types into email input field', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates password value when user types into password input field', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    expect(passwordInput.value).toBe('test123');
  });

  it('calls handleSubmit function when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit function with correct email and password values', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'test123',
    });
  });
});
