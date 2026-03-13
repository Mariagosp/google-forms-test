import type { Form, Response as FormResponse } from "../../services/generatedApi";
import styles from "./ResponseList.module.css";

type ResponseListProps = {
  form: Form;
  responses: FormResponse[];
};

function formatAnswerValue(value: string | string[]): string {
  return Array.isArray(value) ? value.join(", ") : value;
}

export default function ResponseList({ form, responses }: ResponseListProps) {
  const questionTitleById = new Map(form.questions.map((q) => [q.id, q.title]));

  return (
    <ul className={styles.list}>
      {responses.map((response, index) => (
        <li key={response.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.responseNumber}>Response #{index + 1}</span>
          </div>
          <dl className={styles.answers}>
            {response.answers.map(({ questionId, value }) => (
              <div key={questionId} className={styles.answerRow}>
                <dt className={styles.question}>
                  {questionTitleById.get(questionId) ?? questionId}
                </dt>
                <dd className={styles.answer}>
                  {formatAnswerValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}
