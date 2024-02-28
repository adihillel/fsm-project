import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import Result from '../Result/Result';
import FSM from '../../fsm/fsm';
import './Quiz.css'
import { fetchQuizQuestions, QuestionDTO } from '../../api/api';
import StartButton from '../StartButton/StartButton';

const initialState = 'start';
const fsm = new FSM(initialState);

const Quiz = () => {
  const [currentState, setCurrentState] = useState<string>(initialState);
  const [questionsData, setQuestionsData] = useState<QuestionDTO[]>([]);
  const [currentDisplayedQuestion, setCurrentDisplayedQuestion] = useState<QuestionDTO>({
    question: '',
    options: [],
    correctAnswer: '',
    id: 0
  })
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchQuizQuestions()
      .then((response: QuestionDTO[]) => {
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
      const isLast = index === questionsData.length - 1
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
  
  useEffect(()=>{
    if (currentState !== 'start' && currentState !== 'result') {
      console.log('current state', currentState)
      const questionIndex = parseInt(currentState.replace('question', ''), 10) - 1;
      const question = questionsData[questionIndex];
      setCurrentDisplayedQuestion(question)
    }
  },[currentState, questionsData])

  return (
  <div className='quiz-containter'>
    {currentState === 'start' ? <StartButton onClick={()=> handleAnswer('start')} /> : undefined}
    {currentState === 'result' ? <Result score={score} /> : undefined}
    {currentState !== 'start' && currentState !== 'result' 
    ? 
    <Question 
      question={currentDisplayedQuestion.question} 
      options={currentDisplayedQuestion.options} 
      handleAnswerSelection={handleAnswer} 
    /> 
    : undefined}
  </div>
  )
};

export default Quiz;


