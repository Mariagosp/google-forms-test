import { Link, useParams } from "react-router-dom";
import styles from "./ResponsesPage.module.css";
import ResponseList from "../../components/ResponseList";

const MOCK_RESPONSES = [
  {
    id: "r1",
    answers: [
      { question: "What is your name?", answer: "John Doe" },
      { question: "How did you hear about us?", answer: "Search" },
      { question: "Which topics are you interested in?", answer: "Product updates, Blog" },
      { question: "When can we schedule a follow-up call?", answer: "2025-03-20" },
    ],
  },
  {
    id: "r2",
    answers: [
      { question: "What is your name?", answer: "Jane Smith" },
      { question: "How did you hear about us?", answer: "Friend" },
      { question: "Which topics are you interested in?", answer: "Events" },
      { question: "When can we schedule a follow-up call?", answer: "2025-03-25" },
    ],
  },
];

export default function ResponsesPage() {
  const { id } = useParams();
  const formId = id ?? "1";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
        <h1 className={styles.title}>Responses</h1>
        <p className={styles.subtitle}>
          Form ID: {formId} — {MOCK_RESPONSES.length} response(s)
        </p>
      </div>

      <section className={styles.section}>
        <ResponseList responses={MOCK_RESPONSES} />
      </section>
    </div>
  );
}
