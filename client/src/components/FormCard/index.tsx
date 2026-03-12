import styles from "./FormCard.module.css";
import { Link } from "react-router-dom";

export default function FormCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Customer Survey</h3>

      <p className={styles.description}>
        Simple feedback form
      </p>

      <div className={styles.actions}>
        <Link to="/forms/1/fill">Fill</Link>
        <Link to="/forms/1/responses">Responses</Link>
      </div>
    </div>
  );
}
