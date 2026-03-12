import styles from "./FillFormPage.module.css";
import QuestionRenderer from "../../components/QuestionRenderer";

export default function FillFormPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Survey</h1>

      <QuestionRenderer />

      <button className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
}
