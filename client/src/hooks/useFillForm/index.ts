import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitResponseMutation } from "../../services/generatedApi";
import type { Question } from "../../services/generatedApi";
import {
  buildAnswersSchema,
  mapFormValuesToAnswerInput,
} from "../../utils/formAnswersUtils";
import type { AnswerFormValues } from "../../utils/formAnswersUtils";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function useFillForm(formId: string, questions: Question[]) {
  const navigate = useNavigate();
  const [submitResponse] = useSubmitResponseMutation();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const schema = buildAnswersSchema(questions);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnswerFormValues>({
    resolver: yupResolver(schema),
    defaultValues: Object.fromEntries(
      questions.map((q) => [q.id, q.type === "CHECKBOX" ? [] : ""])
    ),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: AnswerFormValues) => {
    setSubmitStatus("submitting");

    try {
      await submitResponse({
        formId,
        answers: mapFormValuesToAnswerInput(values),
      }).unwrap();

      setSubmitStatus("success");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setSubmitStatus("error");
    }
  };

  return {
    control,
    isSubmitting,
    submitStatus,
    handleSubmit: handleSubmit(onSubmit),
  };
}
