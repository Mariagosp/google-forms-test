import * as yup from "yup";
import { QuestionType, type Question } from "../services/generatedApi";

export function createEmptyBuilderQuestion(): Question {
  return {
    id: `q-b-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: "",
    type: QuestionType.Text,
    options: [],
  };
}

export const formMetaSchema = yup.object({
  title: yup.string().trim().required("Form title is required"),
  description: yup.string().trim().default(""),
});

export type FormMetaValues = yup.InferType<typeof formMetaSchema>;

export type BuilderValidationError = {
  questionId: string;
  message: string;
};

export function validateBuilderState(
  questions: Question[]
): BuilderValidationError[] {
  const errors: BuilderValidationError[] = [];

  for (const q of questions) {
    if (!q.title.trim()) {
      errors.push({ questionId: q.id, message: "Question title is required" });
      continue;
    }

    if (q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") {
      if (!q.options?.length) {
        errors.push({ questionId: q.id, message: "Add at least one option" });
      } else if (q.options.some((opt) => !opt.trim())) {
        errors.push({
          questionId: q.id,
          message: "All options must have a non-empty label",
        });
      }
    }
  }

  return errors;
}

export function mapQuestionsToInput(questions: Question[]) {
  return questions.map((q) => ({
    title: q.title,
    type: q.type,
    options: q.options?.length ? q.options : undefined,
  }));
}
