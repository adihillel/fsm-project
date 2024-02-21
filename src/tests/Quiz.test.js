import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Quiz from '../components/Quiz/Quiz';
import * as apiModule from '../api';
import FSM from '../fsm/fsm'

const mockQuestions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin'],
    correctAnswer: 'Paris',
  },
];

jest.mock('../api', () => ({
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

  // test('clicking start button renders first question', async () => {
  //   render(<Quiz />);
  //   const startButton = screen.getByText('Start Quiz');
  //   fireEvent.click(startButton);
  //   await waitFor(() => {
  //     const firstQuestion = screen.getByText(mockQuestions[0].question);
  //     expect(firstQuestion).toBeInTheDocument();
  //   });
  // });
});