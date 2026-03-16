import styles from "./FormBuilder.module.css";
import QuestionEditor from "../../components/QuestionEditor";
import { useFormBuilder } from "../../hooks";

export default function FormBuilderPage() {
  const {
    register,
    metaErrors,
    questions,
    saveError,
    errorByQuestionId,
    canSave,
    isCreating,
    handleSaveForm,
    handleAddQuestion,
    handleQuestionChange,
    handleRemoveQuestion,
  } = useFormBuilder();

  return (
    <form className={styles.container} onSubmit={handleSaveForm} noValidate>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Create form</h1>
        <p className={styles.subtitle}>
          Add a title, description, and your questions.
        </p>
      </div>

      <div className={styles.formBox}>
        <input
          className={styles.input}
          placeholder="Form title *"
          aria-invalid={!!metaErrors.title}
          {...register("title")}
        />
        {metaErrors.title && (
          <p className={styles.fieldError}>{metaErrors.title.message}</p>
        )}

        <textarea
          className={styles.textarea}
          placeholder="Form description (optional)"
          rows={3}
          {...register("description")}
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
        {questions.map((q, index) => (
          <li key={q.id} className={styles.questionItem}>
            <QuestionEditor
              question={q}
              index={index}
              onQuestionChange={handleQuestionChange}
              onRemove={() => handleRemoveQuestion(q.id)}
              validationError={errorByQuestionId[q.id]}
            />
          </li>
        ))}
      </ul>

      {saveError && <p className={styles.errorBanner}>{saveError}</p>}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={!canSave}
          title={
            !canSave && !isCreating
              ? "Fix validation errors before saving"
              : undefined
          }
        >
          {isCreating ? "Saving…" : "Save form"}
        </button>

        <button
          type="button"
          className={styles.addQuestion}
          onClick={handleAddQuestion}
        >
          + Add question
        </button>
      </div>
    </form>
  );
}
