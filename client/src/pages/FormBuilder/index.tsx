import styles from "./FormBuilder.module.css";
import QuestionEditor from "../../components/QuestionEditor";

const MOCK_QUESTIONS = [
  { id: "q1", type: "TEXT" as const, title: "What is your name?", options: [] },
  {
    id: "q2",
    type: "MULTIPLE_CHOICE" as const,
    title: "Preferred contact method?",
    options: ["Email", "Phone", "SMS"],
  },
  {
    id: "q3",
    type: "CHECKBOX" as const,
    title: "Which topics interest you?",
    options: ["Product updates", "Events", "Blog"],
  },
  { id: "q4", type: "DATE" as const, title: "When can we schedule a call?", options: [] },
];

export default function FormBuilderPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Create form</h1>
        <p className={styles.subtitle}>Add a title, description, and your questions.</p>
      </div>

      <div className={styles.formBox}>
        <input
          className={styles.input}
          placeholder="Form title"
          defaultValue="Untitled form"
        />
        <textarea
          className={styles.textarea}
          placeholder="Form description (optional)"
          rows={3}
        />
      </div>

      <div className={styles.questionsHeader}>
        <h2 className={styles.questionsTitle}>Questions</h2>
        <button type="button" className={styles.addQuestion}>
          + Add question
        </button>
      </div>

      <ul className={styles.questionsList}>
        {MOCK_QUESTIONS.map((q, index) => (
          <li key={q.id} className={styles.questionItem}>
            <QuestionEditor
              type={q.type}
              title={q.title}
              options={q.options}
              index={index}
            />
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button type="button" className={styles.saveButton}>
          Save form
        </button>
      </div>
    </div>
  );
}
