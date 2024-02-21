import React from 'react';
import './Question.css'

type QuestionProps = {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelect }) => {
  return (
    <div className='question-container'>
      <h2>{question}</h2>
      <hr/>
      <ol>
        {options.map((option, index) => (
          <li key={index} onClick={() => onSelect(option)}>
            {option}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Question;
