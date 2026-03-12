import styles from "./QuestionEditor.module.css";

export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

type QuestionEditorProps = {
  type: QuestionType;
  title: string;
  options: string[];
  index: number
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
  type,
  title,
  options,
  index
}: QuestionEditorProps) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.dragHandle} title="Drag to reorder">
        ⋮⋮
      </div> */}
      <div className={styles.dragHandle} title="Drag to reorder">
        {index + 1}
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <input
            className={styles.questionInput}
            placeholder="Question title"
            defaultValue={title}
          />
          <select className={styles.select} defaultValue={type}>
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
                    defaultValue={opt}
                    placeholder="Option"
                  />
                  <button
                    type="button"
                    className={styles.removeOption}
                    title="Remove option"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className={styles.addOption}>
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
      </div>
    </div>
  );
}
