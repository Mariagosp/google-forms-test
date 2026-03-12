import styles from "./HomePage.module.css";
import FormCard from "../../components/FormCard";

const MOCK_FORMS = [
  { id: "1", title: "Customer Survey", description: "Short feedback form for our product." },
  { id: "2", title: "Event Registration", description: "Sign up for the upcoming workshop." },
];

export default function HomePage() {
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
          {MOCK_FORMS.map((form) => (
            <li key={form.id}>
              <FormCard
                id={form.id}
                title={form.title}
                description={form.description}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
