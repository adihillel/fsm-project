import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:5000';

export interface QuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

type QuizQuestionsResponse = QuestionType[];

export const fetchQuizQuestions = async (): Promise<QuizQuestionsResponse> => {
  try {
    const response: AxiosResponse<QuizQuestionsResponse> = await axios.get(`${API_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};
