import styles from "./ResponseList.module.css";

type Answer = { question: string; answer: string };
type Response = { id: string; answers: Answer[] };

type ResponseListProps = {
  responses: Response[];
};

export default function ResponseList({ responses }: ResponseListProps) {
  return (
    <ul className={styles.list}>
      {responses.map((response, index) => (
        <li key={response.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.responseNumber}>Response #{index + 1}</span>
          </div>
          <dl className={styles.answers}>
            {response.answers.map(({ question, answer }) => (
              <div key={question} className={styles.answerRow}>
                <dt className={styles.question}>{question}</dt>
                <dd className={styles.answer}>{answer}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}
