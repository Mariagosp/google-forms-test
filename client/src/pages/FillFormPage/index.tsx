import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";
import { selectFormById } from "../../features/forms/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../../app/api/formsApi";
import type { Question } from "../../types";
import { mergeForm } from "../../features/forms/formsSlice";

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const dispatch = useAppDispatch();
  const {
    data: formFromApi,
    isLoading,
    error,
  } = useGetFormQuery(formId, {
    skip: !formId,
  });
  const [submitResponse] = useSubmitResponseMutation();
  const formFromStore = useAppSelector((state) =>
    selectFormById(state, formId)
  );

  const [answers, setAnswers] = useState<
    { questionId: string; value: string | string[] }[]
  >([]);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
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

  useEffect(() => {
    if (formFromApi) {
      dispatch(mergeForm(formFromApi));
    }
  }, [formFromApi, dispatch]);

  const form = formFromApi ?? formFromStore;

  const handleSubmit = async () => {
    try {
      await submitResponse({
        formId,
        answers: answers.map((a) => ({
          questionId: a.questionId,
          value: Array.isArray(a.value) ? a.value : [a.value],
        })),
      });
      alert("Form submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>Error loading form</p>;
  if (!form) {
    return (
      <div className={styles.container}>
        <p className={styles.notFound}>Form not found.</p>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>{form.title}</h1>
          {form.description && (
            <p className={styles.description}>{form.description}</p>
          )}
        </header>

        <ol className={styles.questionsList}>
          {form.questions.map((q: Question) => (
            <li key={q.id ?? q.title} className={styles.questionItem}>
              <QuestionRenderer
                type={q.type}
                title={q.title}
                options={q.options ?? []}
                questionId={q.id!}
                onChange={(value) => handleAnswerChange(q.id!, value)}
              />
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
