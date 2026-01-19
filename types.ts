
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
  multiSelect?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    customError?: string;
  };
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

export interface ResultData {
  id: string;
  created_at: string;
  name: string;
  age: number;
  major: string;
  semester: number;
  social_media: string;
  duration: string;
  unaware_time: number;
  hard_to_stop: number;
  distraction: number;
  procrastination: number;
  scroll_while_study: number;
  addiction_feel: number;
  final_reflection: number;
}
