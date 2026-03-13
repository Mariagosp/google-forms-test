import type { Question, QuestionType } from "../../services/generatedApi";

const hasOptions = (type: QuestionType) =>
  type === "MULTIPLE_CHOICE" || type === "CHECKBOX";

export function useQuestionOptionsEditor(
  question: Question,
  onQuestionChange: (question: Question) => void
) {
  const { options: rawOptions } = question;
  const options = rawOptions ?? [];

  const changeType = (newType: QuestionType) => {
    onQuestionChange({
      ...question,
      type: newType,
      options: hasOptions(newType) ? options : undefined,
    });
  };

  const changeTitle = (title: string) => {
    onQuestionChange({ ...question, title });
  };

  const changeOption = (index: number, value: string) => {
    const next = [...options];
    next[index] = value;
    onQuestionChange({ ...question, options: next });
  };

  const addOption = () => {
    onQuestionChange({ ...question, options: [...options, ""] });
  };

  const removeOption = (index: number) => {
    onQuestionChange({
      ...question,
      options: options.filter((_, i) => i !== index),
    });
  };

  return {
    options,
    hasOptions,
    changeType,
    changeTitle,
    changeOption,
    addOption,
    removeOption,
  };
}

