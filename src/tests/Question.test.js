import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Question from '../components/Question/Question';

test('renders question and options correctly', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(<Question question="Test question" options = { options } onSelect = { jest.fn() } />);
    const questionElement = screen.getByText('Test question');
    expect(questionElement).toBeInTheDocument();

    options.forEach((option) => {
        const optionElement = screen.getByText(option);
        expect(optionElement).toBeInTheDocument();
    });
});

test('calls onSelect function when an option is clicked', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const onSelectMock = jest.fn();
    render(<Question question="Test question" options = { options } onSelect = { onSelectMock } />);
    const optionElement = screen.getByText('Option 1');
    fireEvent.click(optionElement);
    expect(onSelectMock).toHaveBeenCalledWith('Option 1');
});
