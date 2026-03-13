import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ResponsesPage.module.css";
import ResponseList from "../../components/ResponseList";
import { selectFormById } from "../../features/forms/selectors";
import { selectResponsesByFormId } from "../../features/responses/selectors";
import { useAppSelector, useAppDispatch } from "../../app/store";
import {
  useGetFormQuery,
  useGetResponsesQuery,
} from "../../services/generatedApi";
import type { Form as DomainForm } from "../../services/generatedApi";
import { mergeForm } from "../../features/forms/formsSlice";
import { setResponsesForForm } from "../../features/responses/responsesSlice";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? "";
  const dispatch = useAppDispatch();

  const {
    data: formQueryData,
    isLoading: formLoading,
  } = useGetFormQuery(
    { id: formId },
    { skip: !formId }
  );

  const { data: responsesQueryData } = useGetResponsesQuery(
    { formId },
    {
      skip: !formId,
      refetchOnMountOrArgChange: true,
    }
  );

  const formFromStore = useAppSelector((state) =>
    selectFormById(state, formId)
  );
  const responses = useAppSelector((state) =>
    selectResponsesByFormId(state, formId)
  );

  const formFromApi = useMemo((): DomainForm | undefined => {
    if (!formQueryData?.form) return undefined;
    return {
      id: formQueryData.form.id,
      title: formQueryData.form.title,
      description: formQueryData.form.description ?? undefined,
      questions: formQueryData.form.questions.map((q) => ({
        id: q.id,
        title: q.title,
        type: q.type,
        options: q.options ?? [],
      })),
    };
  }, [formQueryData?.form]);

  const normalizedResponses = useMemo(() => {
    return responsesQueryData?.responses?.map((r) => ({
      id: r.id,
      formId: r.formId,
      answers: r.answers.map((a) => ({
        questionId: a.questionId,
        value: a.value,
      })),
    })) ?? [];
  }, [responsesQueryData?.responses]);

  useEffect(() => {
    if (formFromApi) {
      dispatch(mergeForm(formFromApi));
    }
  }, [formFromApi, dispatch]);

  useEffect(() => {
    if (formId && normalizedResponses.length > 0) {
      dispatch(
        setResponsesForForm({ formId, responses: normalizedResponses })
      );
    }
  }, [formId, normalizedResponses, dispatch]);

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
