import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import Result from '../Result/Result';
import FSM from '../../fsm/fsm';
import './Quiz.css'
import { fetchQuizQuestions, QuestionType } from '../../api';

const initialState = 'start';
const fsm = new FSM(initialState);

const Quiz = () => {
  const [currentState, setCurrentState] = useState<string>(initialState);
  const [questionsData, setQuestionsData] = useState<QuestionType[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchQuizQuestions()
      .then((response: QuestionType[]) => {
        setQuestionsData(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    const addQuestionState = (questionId: number, index: number) => {
      if (index === 0) {
        fsm.addState('start', { transitions: { next: `question${questionId}` } });
      }
      const currentStateName = `question${questionId}`;
      const isLast = index === questionsData.length -1
      const nextState = isLast ? { transitions: { next: 'result' } } : { transitions: { next: `question${Number(questionId) + 1}` } };
      fsm.addState(currentStateName, nextState);
      if (isLast) {
        fsm.addState('result', {
          transitions: {}
        });
      }
    };

    questionsData.forEach((question, index) => {
        addQuestionState(question.id, index)
      });
  }, [questionsData])

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
        return <Result score={score} />;
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
