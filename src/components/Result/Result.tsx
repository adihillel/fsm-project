import React from 'react';
import './Result.css'

type ResultProps = {
  score: number;
};

const Result: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className='results-container'>
      <h2>Your Quiz Score: {score}</h2>
    </div>
  );
};

export default Result;
