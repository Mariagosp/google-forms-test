import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import FormCard from "../../components/FormCard";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Forms</h1>

        <Link to="/forms/new" className={styles.createButton}>
          Create Form
        </Link>
      </header>

      <div className={styles.formsList}>
        <FormCard />
        <FormCard />
      </div>
    </div>
  );
}
