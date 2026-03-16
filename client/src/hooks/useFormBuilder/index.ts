import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectBuilderQuestions } from "../../features/forms/selectors";
import {
  addQuestion,
  removeQuestion,
  resetBuilder,
  updateQuestion,
} from "../../features/forms/formsSlice";
import { useCreateFormMutation } from "../../services/generatedApi";
import type { Question } from "../../services/generatedApi";
import {
  createEmptyBuilderQuestion,
  formMetaSchema,
  mapQuestionsToInput,
  validateBuilderState,
} from "../../utils/formBuilderUtils";
import type { BuilderValidationError, FormMetaValues } from "../../utils/formBuilderUtils";

export function useFormBuilder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const questions = useAppSelector(selectBuilderQuestions);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();

  const {
    register,
    handleSubmit,
    reset: resetMeta,
    formState: { errors: metaErrors, isValid: isMetaValid },
  } = useForm<FormMetaValues>({
    resolver: yupResolver(formMetaSchema),
    mode: "onChange",
    defaultValues: { title: "", description: "" },
  });

  const questionErrors: BuilderValidationError[] = validateBuilderState(questions);

  const errorByQuestionId: Record<string, string> = Object.fromEntries(
    questionErrors.map(({ questionId, message }) => [questionId, message])
  );

  const canSave = isMetaValid && questionErrors.length === 0 && !isCreating;

  const handleAddQuestion = () => {
    dispatch(addQuestion(createEmptyBuilderQuestion()));
  };

  const handleQuestionChange = (question: Question) => {
    dispatch(updateQuestion(question));
  };

  const handleRemoveQuestion = (questionId: string) => {
    dispatch(removeQuestion(questionId));
  };

  const onSubmit = async (values: FormMetaValues) => {
    setSaveError(null);
    try {
      await createForm({
        title: values.title,
        description: values.description || undefined,
        questions: mapQuestionsToInput(questions),
      }).unwrap();

      dispatch(resetBuilder());
      resetMeta();
      navigate("/");
    } catch {
      setSaveError("Failed to save the form. Please try again.");
    }
  };

  const handleSaveForm = handleSubmit(onSubmit);

  return {
    register,
    metaErrors,
    questions,
    saveError,
    questionErrors,
    errorByQuestionId,
    canSave,
    isCreating,
    handleSaveForm,
    handleAddQuestion,
    handleQuestionChange,
    handleRemoveQuestion,
  };
}
