import { Link, useParams } from "react-router-dom";
import styles from "./ResponsesPage.module.css";
import ResponseList from "../../components/ResponseList";
import { selectFormById } from "../../features/forms/selectors";
import { selectResponsesByFormId } from "../../features/responses/selectors";
import { useAppSelector } from "../../app/store";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const form = useAppSelector((state) => selectFormById(state, formId));
  const responses = useAppSelector((state) =>
    selectResponsesByFormId(state, formId)
  );

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
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
        <h1 className={styles.title}>{form.title}</h1>
        <p className={styles.subtitle}>
          {responses.length} response(s)
        </p>
      </div>

      <section className={styles.section}>
        <ResponseList form={form} responses={responses} />
      </section>
    </div>
  );
}
