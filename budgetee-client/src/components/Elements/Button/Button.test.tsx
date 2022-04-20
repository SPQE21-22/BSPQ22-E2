import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Button } from './Button';

const buttonContent = 'This is a test button';

test('renders content', () => {
  render(<Button>{buttonContent}</Button>);

  const button = screen.getByText(buttonContent);

  expect(button).toBeDefined();
});

test('user clicking works correctly', () => {
  const mockHandler = jest.fn();

  render(<Button onClick={mockHandler}>{buttonContent}</Button>);
  
  const button = screen.getByText(buttonContent);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test('onClick not working when the button is disabled', () => {
  const mockHandler = jest.fn();

  render(<Button disabled onClick={mockHandler}>{buttonContent}</Button>);
  
  const button = screen.getByText(buttonContent);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(0);
});

test('renders <Link /> when using asLink and to props', () => {
  const linkTo = '/test';

  render(
    <Router>
      <Button asLink to={linkTo}>{buttonContent}</Button>
    </Router>
  );
  
  const anchor = screen.getByRole('link');
  expect(anchor).toHaveAttribute('href', linkTo);
});