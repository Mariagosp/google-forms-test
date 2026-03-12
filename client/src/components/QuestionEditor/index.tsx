import styles from "./QuestionEditor.module.css";

export default function QuestionEditor() {
  return (
    <div className={styles.container}>
      <input
        className={styles.questionInput}
        placeholder="Question title"
      />

      <select className={styles.select}>
        <option>TEXT</option>
        <option>MULTIPLE_CHOICE</option>
        <option>CHECKBOX</option>
        <option>DATE</option>
      </select>

      <button className={styles.addOption}>
        Add option
      </button>
    </div>
  );
}
