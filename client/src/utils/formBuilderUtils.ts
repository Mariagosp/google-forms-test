import type { FormsState } from "../features/forms/formsSlice";
import { QuestionType, type Question } from "../services/generatedApi";

export function createEmptyBuilderQuestion(): Question {
  return {
    id: `q-b-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: "",
    type: QuestionType.Text,
    options: [],
  };
}

export function mapBuilderStateToCreateFormVariables(builder: FormsState["builder"]) {
  return {
    title: builder.title.trim(),
    description: builder.description.trim() || undefined,
    questions: builder.questions.map((q) => ({
      title: q.title,
      type: q.type,
      options: q.options?.length ? q.options : undefined,
    })),
  };
}
