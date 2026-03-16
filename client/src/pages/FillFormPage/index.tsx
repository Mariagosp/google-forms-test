import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";
import { selectFormById } from "../../features/forms/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { mergeForm } from "../../features/forms/formsSlice";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../../services/generatedApi";
import type {
  Form as GqlForm,
} from "../../services/generatedApi";
import { mapGqlFormToDomainForm } from "../../utils/formMappers";
import { useFormAnswers } from "../../hooks";

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

  const {
    handleAnswerChange,
    canSubmit,
    setAnswers,
    buildSubmitPayload,
  } = useFormAnswers(form?.questions);

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      await submitResponse({
        formId,
        answers: buildSubmitPayload(),
      }).unwrap();

      alert("Form submitted successfully!");
      navigate("/");
      setAnswers([]);
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  useEffect(() => {
    if (formFromApi?.form) {
      dispatch(mergeForm(mapGqlFormToDomainForm(formFromApi.form)));
    }
  }, [formFromApi, dispatch]);

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
            disabled={!canSubmit}
            title={!canSubmit ? "Please answer all questions before submitting" : undefined}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
