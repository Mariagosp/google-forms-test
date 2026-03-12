import { useNavigate } from "react-router-dom";
import styles from "./FormBuilder.module.css";
import QuestionEditor from "../../components/QuestionEditor";
import { selectBuilder } from "../../features/forms/selectors";
import {
  setBuilderTitle,
  setBuilderDescription,
  addQuestion,
  removeQuestion,
  updateQuestion,
  resetBuilder,
} from "../../features/forms/formsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { QuestionType, type Question } from "../../types";
import { useCreateFormMutation } from "../../app/api/formsApi";

function createNewQuestion(): Question {
  return {
    id: `q-b-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: "",
    type: QuestionType.TEXT,
    options: [],
  };
}

export default function FormBuilderPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const builder = useAppSelector(selectBuilder);

  const handleAddQuestion = () => {
    dispatch(addQuestion(createNewQuestion()));
  };

  const handleQuestionChange = (question: Question) => {
    dispatch(updateQuestion(question));
  };

  const handleRemoveQuestion = (questionId: string) => {
    dispatch(removeQuestion(questionId));
  };

  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();

  const handleSaveForm = async () => {
    try {
      await createForm({
        title: builder.title.trim(),
        description: builder.description.trim() || undefined,
        questions: builder.questions.map((q) => ({
          title: q.title,
          type: q.type,
          options: q.options?.length ? q.options : undefined,
        })),
      }).unwrap();
      dispatch(resetBuilder());
      navigate("/");
    } catch {
      // error is available from mutation result if you want to show it
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Create form</h1>
        <p className={styles.subtitle}>
          Add a title, description, and your questions.
        </p>
      </div>

      <div className={styles.formBox}>
        <input
          className={styles.input}
          placeholder="Form title"
          value={builder.title}
          onChange={(e) => dispatch(setBuilderTitle(e.target.value))}
        />
        <textarea
          className={styles.textarea}
          placeholder="Form description (optional)"
          rows={3}
          value={builder.description}
          onChange={(e) => dispatch(setBuilderDescription(e.target.value))}
        />
      </div>

      <div className={styles.questionsHeader}>
        <h2 className={styles.questionsTitle}>Questions</h2>
        <button
          type="button"
          className={styles.addQuestion}
          onClick={handleAddQuestion}
        >
          + Add question
        </button>
      </div>

      <ul className={styles.questionsList}>
        {builder.questions.map((q, index) => (
          <li key={q.id} className={styles.questionItem}>
            <QuestionEditor
              question={q}
              index={index}
              onQuestionChange={handleQuestionChange}
              onRemove={() =>
                handleRemoveQuestion(q?.id || Date.now().toString())
              }
            />
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSaveForm}
          disabled={!builder.title.trim() || isCreating}
        >
          {isCreating ? "Saving…" : "Save form"}
        </button>
      </div>
    </div>
  );
}
