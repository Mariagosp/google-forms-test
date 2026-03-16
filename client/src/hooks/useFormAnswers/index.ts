import { useMemo, useState } from "react";
import type {
  AnswerInput,
  Question as GqlQuestion,
  Question,
} from "../../services/generatedApi";

export function useFormAnswers(questions: Question[] | undefined) {
  const [answers, setAnswers] = useState<
    { questionId: GqlQuestion["id"]; value: string | string[] }[]
  >([]);

  const canSubmit = useMemo(() => {
    if (!questions || questions.length === 0) return false;

    return questions.every((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      if (!answer) return false;

      if (Array.isArray(answer.value)) {
        return answer.value.length > 0;
      }

      return answer.value.trim().length > 0;
    });
  }, [questions, answers]);

  const handleAnswerChange = (
    questionId: GqlQuestion["id"],
    value: string | string[]
  ) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { questionId, value } : a
        );
      } else {
        return [...prev, { questionId, value }];
      }
    });
  };

  const buildSubmitPayload = (): AnswerInput[] =>
    answers.map((a) => ({
      questionId: a.questionId,
      value: Array.isArray(a.value) ? a.value : [a.value],
    }));

  return { answers, setAnswers, handleAnswerChange, canSubmit, buildSubmitPayload };
}
