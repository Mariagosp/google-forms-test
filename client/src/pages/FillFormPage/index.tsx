import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";
import { selectFormById } from "../../features/forms/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
// import {
//   useGetFormQuery,
//   useSubmitResponseMutation,
// } from "../../app/api/formsApi";
import { mergeForm } from "../../features/forms/formsSlice";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../../services/generatedApi";
import type {
  Question as GqlQuestion,
  Form as GqlForm,
} from "../../services/generatedApi";
// import { useGetFormQuery, useSubmitResponseMutation } from "../../graphql/generated";

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: formFromApi,
    isLoading,
    error,
  } = useGetFormQuery({ id: formId });
  const [submitResponse] = useSubmitResponseMutation();
  const formFromStore = useAppSelector(
    (state) => selectFormById(state, formId) as GqlForm | undefined
  );

  const form: GqlForm | undefined = formFromApi?.form ?? formFromStore;

  const [answers, setAnswers] = useState<
    { questionId: GqlQuestion["id"]; value: string | string[] }[]
  >([]);

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

  useEffect(() => {
    if (formFromApi?.form) {
      const safeForm = {
        id: formFromApi.form.id,
        title: formFromApi.form.title,
        questions: formFromApi.form.questions.map((question) => ({
          id: question.id,
          title: question.title,
          type: question.type,
          options: question.options ?? undefined,
        })),
        description: formFromApi.form.description ?? undefined,
      };
      dispatch(mergeForm(safeForm));
    }
  }, [formFromApi, dispatch]);

  const handleSubmit = async () => {
    if (answers.length < (form?.questions.length || 0)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      await submitResponse({
        formId,
        answers: answers.map((a) => ({
          questionId: a.questionId,
          value: Array.isArray(a.value) ? a.value : [a.value],
        })),
      }).unwrap();

      alert("Form submitted successfully!");
      navigate("/");
      setAnswers([]);
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
          {form.questions.map((q) => (
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
