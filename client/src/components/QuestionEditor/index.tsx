import type { Question, QuestionType } from "../../services/generatedApi";
import styles from "./QuestionEditor.module.css";

type QuestionEditorProps = {
  question: Question;
  index: number;
  onQuestionChange: (question: Question) => void;
  onRemove: () => void;
};

const TYPE_LABELS: Record<QuestionType, string> = {
  TEXT: "Short answer",
  MULTIPLE_CHOICE: "Multiple choice",
  CHECKBOX: "Checkboxes",
  DATE: "Date",
};

const hasOptions = (type: QuestionType) =>
  type === "MULTIPLE_CHOICE" || type === "CHECKBOX";

export default function QuestionEditor({
  question,
  index,
  onQuestionChange,
  onRemove,
}: QuestionEditorProps) {
  const { type, title, options: rawOptions } = question;
  const options = rawOptions ?? [];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, title: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    onQuestionChange({
      ...question,
      type: newType,
      options: hasOptions(newType) ? options : undefined,
    });
  };

  const handleOptionChange = (i: number, value: string) => {
    const next = [...options];
    next[i] = value;
    onQuestionChange({ ...question, options: next });
  };

  const handleAddOption = () => {
    onQuestionChange({ ...question, options: [...options, ""] });
  };

  const handleRemoveOption = (i: number) => {
    onQuestionChange({
      ...question,
      options: options.filter((_, j) => j !== i),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.dragHandle}>
        {index + 1}
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <input
            className={styles.questionInput}
            placeholder="Question title"
            value={title}
            onChange={handleTitleChange}
          />
          <select className={styles.select} value={type} onChange={handleTypeChange}>
            <option value="TEXT">{TYPE_LABELS.TEXT}</option>
            <option value="MULTIPLE_CHOICE">{TYPE_LABELS.MULTIPLE_CHOICE}</option>
            <option value="CHECKBOX">{TYPE_LABELS.CHECKBOX}</option>
            <option value="DATE">{TYPE_LABELS.DATE}</option>
          </select>
        </div>

        {hasOptions(type) && (
          <div className={styles.optionsBlock}>
            <span className={styles.optionsLabel}>Options</span>
            <ul className={styles.optionsList}>
              {options.map((opt, i) => (
                <li key={i} className={styles.optionRow}>
                  <span className={styles.optionBullet}>
                    {type === "MULTIPLE_CHOICE" ? "○" : "☐"}
                  </span>
                  <input
                    className={styles.optionInput}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    placeholder="Option"
                  />
                  <button
                    type="button"
                    className={styles.removeOption}
                    title="Remove option"
                    onClick={() => handleRemoveOption(i)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className={styles.addOption} onClick={handleAddOption}>
              + Add option
            </button>
          </div>
        )}

        {type === "TEXT" && (
          <p className={styles.placeholder}>Short text answer</p>
        )}
        {type === "DATE" && (
          <p className={styles.placeholder}>Date picker</p>
        )}

        <button
          type="button"
          className={styles.removeQuestion}
          onClick={onRemove}
          title="Remove question"
        >
          Remove question
        </button>
      </div>
    </div>
  );
}
