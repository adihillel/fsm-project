import React from 'react';
import './Question.css'

type QuestionProps = {
  question: string;
  options: string[];
  handleAnswerSelection: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, handleAnswerSelection }) => {
  return (
    <div className='question-container'>
      <h2>{question}</h2>
      <hr/>
      <ol>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleAnswerSelection(option)}>
            {option}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Question;
