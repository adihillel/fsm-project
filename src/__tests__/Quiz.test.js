import React from 'react';
import { render, screen } from '@testing-library/react';
import Quiz from '../components/Quiz/Quiz';
import userEvent from "@testing-library/user-event";
import * as apiModule from '../api/api';

const mockQuestions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin'],
    correctAnswer: 'Paris',
  },
];

jest.mock('../api/api', () => ({
  fetchQuizQuestions: jest.fn(),
}));

jest.mock('../fsm/fsm', () => {
  return jest.fn().mockImplementation(() => ({
    addState: jest.fn(),
    transitionTo: jest.fn(),
    getState: jest.fn(),
  }));
});

describe('Quiz component', () => {
  beforeEach(async () => {
    apiModule.fetchQuizQuestions.mockResolvedValue(mockQuestions);
  });

  test('renders start button', () => {
    render(<Quiz />);
    const startButton = screen.getByText('Start Quiz');
    expect(startButton).toBeInTheDocument();
  });

    test('click on start button and see question', async() => {
    render(<Quiz />);
    const startButton = screen.getByText('Start Quiz');
    userEvent.click(startButton)
    const currentState = await screen.findByText('What is the capital of France?');
    expect(currentState).toBeInTheDocument();
  });
});