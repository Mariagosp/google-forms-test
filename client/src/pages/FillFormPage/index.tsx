import { useParams, Link } from "react-router-dom";
import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";
import { selectFormById } from "../../features/forms/selectors";
import { useAppSelector } from "../../app/store";

export default function FillFormPage() {
  const { id } = useParams<{ id: string }>();
  const form = useAppSelector((state) => selectFormById(state, id ?? ""));

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
            <li key={q.id} className={styles.questionItem}>
              <QuestionRenderer
                type={q.type}
                title={q.title}
                options={q.options ?? []}
              />
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <button type="button" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
