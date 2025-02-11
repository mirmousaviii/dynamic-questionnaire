export type QuestionType = 'text' | 'radio' | 'checkbox' | 'select';

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  dependency?: {
    questionId: string;
    operator:
      | 'equals'
      | 'not_equals'
      | 'greater_than'
      | 'less_than'
      | 'in'
      | 'not_in';
    value: string | number | string[];
  };
}

export interface Step {
  id: string;
  title: string;
  questions: Question[];
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  steps: Step[];
}

export interface Response {
  questionId: string;
  answer: string;
}

export interface ResponsesData {
  question: string;
  responses: { answer: string; createdAt: string }[];
}
