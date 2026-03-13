import { useEffect } from "react";
import styles from "./HomePage.module.css";
import FormCard from "../../components/FormCard";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { setForms } from "../../features/forms/formsSlice";
import { useGetFormsQuery } from "../../services/generatedApi";
import { mapGqlFormsToDomainForms } from "../../utils/formMappers";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const formsFromStore = useAppSelector((state) => state.forms.forms);

  useEffect(() => {
    if (data?.forms) {
      dispatch(setForms(mapGqlFormsToDomainForms(data.forms)));
    }
  }, [data, dispatch]);

  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>Error loading forms</p>;

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
          {formsFromStore.map((form) => (
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
