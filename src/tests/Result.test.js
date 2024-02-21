import React from 'react';
import { render, screen } from '@testing-library/react';
import Result from '../components/Result/Result';

describe('Result component', () => {
  test('renders quiz score correctly', () => {
    const score = 10;
    render(<Result score={score} />);
    const scoreElement = screen.getByText(`Your Quiz Score: ${score}`);
    expect(scoreElement).toBeInTheDocument();
  });
});
