import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import Result from '../Result/Result';
import FSM from '../../fsm/fsm';
import './Quiz.css'
import { fetchQuizQuestions, QuestionType } from '../../api';

const initialState = 'start';
const fsm = new FSM(initialState);

const Quiz = () => {
  // Define state types
  const [currentState, setCurrentState] = useState<string>(initialState);
  const [questionsData, setQuestionsData] = useState<QuestionType[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(()=>{
    fetchQuizQuestions()
      .then((response: QuestionType[]) => {
        setQuestionsData(response)
    })
    .catch((error: any) => {
        console.log(error)
    })
  }, [])
  
questionsData.forEach((question, index) => {
  if(index === 0){
    const currentState = 'start'
    const nextState = `question${question.id}`
    fsm.addState(currentState, {
        transitions: {
        next: nextState,
        },
    });
  }

  const currentState = `question${question.id}`;
  const nextState = `question${Number(question.id)+1}`;
  fsm.addState(currentState, {
    transitions: {
      next:index === questionsData.length -1 ? 'result' : nextState,
    },
  });
});
fsm.addState('result', {
  transitions: {}
});

  const handleAnswer = (answer: string) => {
    const nextState = fsm.getState()?.transitions.next;
    const currentQuestionIndex = parseInt(currentState.replace('question', ''), 10) - 1;
    const currentQuestion = questionsData[currentQuestionIndex];

 
  if (currentQuestion?.correctAnswer === answer) {
    setScore(score + 1);
  }

    if (nextState) {
      fsm.transitionTo(nextState);
      setCurrentState(nextState);
    }
  };

const renderState = () => {
  switch (currentState) {
    case 'start':
      return <button className='start-btn' onClick={() => handleAnswer('start')}>Start Quiz</button>;
    case 'result':
      return <Result score={score}/>;
    default:
      const questionIndex = parseInt(currentState.replace('question', ''), 10) - 1;
      const question = questionsData[questionIndex];
      return (
        <Question
          question={question.question}
          options={question.options}
          onSelect={handleAnswer}
        />
      );
  }
};

  return <div className='quiz-containter'>{renderState()}</div>;
};

export default Quiz;
