import * as yup from "yup";
import type { Question } from "../services/generatedApi";

export type AnswerFormValues = Record<string, string | string[]>;

export function buildAnswersSchema(
  questions: Question[]
): yup.ObjectSchema<AnswerFormValues> {
  const shape: Record<string, yup.Schema> = {};

  for (const q of questions) {
    if (q.type === "CHECKBOX") {
      shape[q.id] = yup
        .array(yup.string().required())
        .min(1, "Please select at least one option")
        .required("Please select at least one option");
    } else {
      // TEXT, MULTIPLE_CHOICE, DATE
      shape[q.id] = yup
        .string()
        .trim()
        .required("This field is required");
    }
  }

  return yup.object().shape(shape)
}

export function mapFormValuesToAnswerInput(
  values: AnswerFormValues
): { questionId: string; value: string[] }[] {
  return Object.entries(values).map(([questionId, value]) => ({
    questionId,
    value: Array.isArray(value) ? value : [value],
  }));
}
