import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ResponsesPage.module.css";
import ResponseList from "../../components/ResponseList";
import { selectFormById } from "../../features/forms/selectors";
import { selectResponsesByFormId } from "../../features/responses/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { useGetFormQuery, useGetResponsesQuery } from "../../app/api/formsApi";
import { mergeForm } from "../../features/forms/formsSlice";
import { setResponsesForForm } from "../../features/responses/responsesSlice";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const dispatch = useAppDispatch();

  const {
    data: formFromApi,
    isLoading: formLoading,
  } = useGetFormQuery(formId, { skip: !formId });
  const { data: responsesData } = useGetResponsesQuery(formId, {
    skip: !formId,
  });

  const formFromStore = useAppSelector((state) =>
    selectFormById(state, formId)
  );
  const responses = useAppSelector((state) =>
    selectResponsesByFormId(state, formId)
  );

  useEffect(() => {
    if (formFromApi) {
      dispatch(mergeForm(formFromApi));
    }
  }, [formFromApi, dispatch]);

  useEffect(() => {
    if (responsesData != null && formId) {
      dispatch(setResponsesForForm({ formId, responses: responsesData }));
    }
  }, [formId, responsesData, dispatch]);

  const form = formFromApi ?? formFromStore;

  if (formLoading && !form) {
    return <p className={styles.status}>Loading...</p>;
  }
  if (!form) {
    return (
      <div className={styles.container}>
        <p className={styles.notFound}>Form not found.</p>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to forms
        </Link>
        <h1 className={styles.title}>{form.title}</h1>
        <p className={styles.subtitle}>{responses.length} response(s)</p>
      </div>

      <section className={styles.section}>
        <ResponseList form={form} responses={responses} />
      </section>
    </div>
  );
}
