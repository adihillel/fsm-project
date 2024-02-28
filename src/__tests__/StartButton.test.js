import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StartButton from '../components/StartButton/StartButton';

describe('StartButton component', () => {
  test('renders with correct text', () => {
    render(<StartButton />);
    const startButton = screen.getByText('Start Quiz');
    expect(startButton).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<StartButton onClick={onClickMock} />);
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
