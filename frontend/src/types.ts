export interface Question {
  id: string;
  question: string;
  type: string;
  options?: string[];
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
  steps: Step[];
}
