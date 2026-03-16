import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";
import { selectFormById } from "../../features/forms/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { mergeForm } from "../../features/forms/formsSlice";
import { useGetFormQuery } from "../../services/generatedApi";
import type { Form as GqlForm } from "../../services/generatedApi";
import { mapGqlFormToDomainForm } from "../../utils/formMappers";
import { useFillForm } from "../../hooks";

type FillFormBodyProps = {
  form: GqlForm;
  formId: string;
};

function FillFormBody({ form, formId }: FillFormBodyProps) {
  const { control, isSubmitting, submitStatus, handleSubmit } = useFillForm(
    formId,
    form.questions
  );

  if (submitStatus === "success") {
    return (
      <div className={styles.successCard}>
        <span className={styles.successIcon}>✓</span>
        <h2 className={styles.successTitle}>Response submitted!</h2>
        <p className={styles.successText}>
          Thank you. You will be redirected to the homepage shortly.
        </p>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <header className={styles.header}>
        <h1 className={styles.title}>{form.title}</h1>
        {form.description && (
          <p className={styles.description}>{form.description}</p>
        )}
      </header>

      <ol className={styles.questionsList}>
        {form.questions.map((q) => (
          <li key={q.id} className={styles.questionItem}>
            <Controller
              name={q.id}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <QuestionRenderer
                    type={q.type}
                    title={q.title}
                    options={q.options ?? []}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className={styles.fieldError}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </li>
        ))}
      </ol>

      {submitStatus === "error" && (
        <p className={styles.errorBanner}>
          Something went wrong. Please try again.
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const dispatch = useAppDispatch();

  const {
    data: formFromApi,
    isLoading,
    error,
  } = useGetFormQuery({ id: formId });

  const formFromStore = useAppSelector(
    (state) => selectFormById(state, formId) as GqlForm | undefined
  );

  const form: GqlForm | undefined = formFromApi?.form ?? formFromStore;

  useEffect(() => {
    if (formFromApi?.form) {
      dispatch(mergeForm(mapGqlFormToDomainForm(formFromApi.form)));
    }
  }, [formFromApi, dispatch]);

  if (isLoading && !form) {
    return <p className={styles.status}>Loading...</p>;
  }

  if (error && !form) {
    return <p className={styles.status}>Error loading form</p>;
  }

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
      <FillFormBody key={form.id} form={form} formId={formId} />
    </div>
  );
}
