import styles from "./HomePage.module.css";
import FormCard from "../../components/FormCard";
import { selectForms } from "../../features/forms/selectors";
import { useAppSelector } from "../../app/store";

export default function HomePage() {
  const forms = useAppSelector(selectForms);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Your forms</h1>
        <p className={styles.subtitle}>
          Create forms, share them, and view responses in one place.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent forms</h2>
        <ul className={styles.formsList}>
          {forms.map((form) => (
            <li key={form.id}>
              <FormCard
                id={form.id}
                title={form.title}
                description={form.description ?? ""}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
