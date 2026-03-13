import { useEffect } from "react";
import styles from "./HomePage.module.css";
import FormCard from "../../components/FormCard";
import { useAppSelector, useAppDispatch } from "../../app/store";
// import { useGetFormsQuery, type Form } from "../../graphql/generated";
import { setForms } from "../../features/forms/formsSlice";
import { useGetFormsQuery } from "../../services/generatedApi";

export default function HomePage() {
  const dispatch = useAppDispatch();
  // Force refetch on remount so newly created forms appear on the home page
  const { data, isLoading, error } = useGetFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const formsFromStore = useAppSelector(state => state.forms.forms);

  useEffect(() => {
    if (data?.forms) {
      const normalizedForms = data.forms.map((form) => ({
        ...form,
        description: form.description ?? "",
        questions: form.questions.map((q) => ({
          ...q,
          options: q.options ?? [],
        })),
      }));

      dispatch(setForms(normalizedForms));
    }
  }, [data, dispatch]);

  // const forms: Form[] =
  //   data?.forms.map((f) => ({
  //     ...f,
  //     description: f.description ?? "",
  //     questions: f.questions.map((q) => ({
  //       ...q,
  //       options: q.options ?? [],
  //     })),
  //   })) ?? [];

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
