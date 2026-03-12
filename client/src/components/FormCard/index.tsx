import { Link } from "react-router-dom";
import styles from "./FormCard.module.css";

type FormCardProps = {
  id: string;
  title: string;
  description: string;
};

export default function FormCard({ id, title, description }: FormCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        <Link to={`/forms/${id}/fill`} className={styles.primaryAction}>
          Fill form
        </Link>
        <Link to={`/forms/${id}/responses`} className={styles.secondaryAction}>
          View responses
        </Link>
      </div>
    </article>
  );
}
