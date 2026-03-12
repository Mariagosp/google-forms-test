export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

export type QuestionType =
  | "TEXT"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX"
  | "DATE";

export const QuestionType = {
  TEXT: "TEXT",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  CHECKBOX: "CHECKBOX",
  DATE: "DATE",
} as const satisfies Record<string, QuestionType>;

export type Answer = {
  questionId: string;
  value: string | string[];
};

export type FormResponse = {
  id: string;
  formId: string;
  answers: Answer[];
};