
export type InputType = 'text' | 'number' | 'select' | 'scale' | 'choice';

export interface QuestionOption {
  label: string;
  value: string | number;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: InputType;
  placeholder?: string;
  options?: QuestionOption[];
  required?: boolean;
}

export interface FormData {
  [key: string]: string | number | undefined;
}

export enum AppState {
  WELCOME = 'WELCOME',
  INTRO = 'INTRO',
  QUESTIONS = 'QUESTIONS',
  THANK_YOU = 'THANK_YOU',
  RESULTS = 'RESULTS'
}

export type Theme = 'light' | 'dark';
