import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";

const MOCK_FORM = {
  title: "Customer Survey",
  description: "Help us improve by sharing your feedback. It only takes a minute.",
  questions: [
    { id: "1", type: "TEXT" as const, title: "What is your name?", options: [] },
    {
      id: "2",
      type: "MULTIPLE_CHOICE" as const,
      title: "How did you hear about us?",
      options: ["Search", "Social media", "Friend", "Other"],
    },
    {
      id: "3",
      type: "CHECKBOX" as const,
      title: "Which topics are you interested in?",
      options: ["Product updates", "Events", "Blog", "Support"],
    },
    {
      id: "4",
      type: "DATE" as const,
      title: "When can we schedule a follow-up call?",
      options: [],
    },
  ],
};

export default function FillFormPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>{MOCK_FORM.title}</h1>
          {MOCK_FORM.description && (
            <p className={styles.description}>{MOCK_FORM.description}</p>
          )}
        </header>

        <ol className={styles.questionsList}>
          {MOCK_FORM.questions.map((q) => (
            <li key={q.id} className={styles.questionItem}>
              <QuestionRenderer
                type={q.type}
                title={q.title}
                options={q.options}
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
