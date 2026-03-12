import styles from "./FormBuilder.module.css";
import QuestionEditor from "../../components/QuestionEditor";

export default function FormBuilderPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Form</h1>

      <div className={styles.formBox}>
        <input
          className={styles.input}
          placeholder="Form title"
        />

        <textarea
          className={styles.textarea}
          placeholder="Form description"
        />
      </div>

      <div className={styles.questionsBlock}>
        <QuestionEditor />
      </div>

      <button className={styles.saveButton}>
        Save Form
      </button>
    </div>
  );
}
