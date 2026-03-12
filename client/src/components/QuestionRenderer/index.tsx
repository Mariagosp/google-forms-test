import type { QuestionType } from "../../types";
import styles from "./QuestionRenderer.module.css";

type QuestionRendererProps = {
  type: QuestionType;
  title: string;
  options: string[];
};

export default function QuestionRenderer({
  type,
  title,
  options,
}: QuestionRendererProps) {
  return (
    <div className={styles.question}>
      <label className={styles.label}>{title}</label>

      {type === "TEXT" && (
        <input
          type="text"
          className={styles.input}
          placeholder="Your answer"
        />
      )}

      {type === "MULTIPLE_CHOICE" && (
        <div className={styles.optionGroup} role="group">
          {options.map((opt, i) => (
            <label key={i} className={styles.radioOption}>
              <input type="radio" name={`q-${title}`} value={opt} className={styles.radioInput} />
              <span className={styles.radioLabel}>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {type === "CHECKBOX" && (
        <div className={styles.optionGroup} role="group">
          {options.map((opt, i) => (
            <label key={i} className={styles.checkboxOption}>
              <input type="checkbox" value={opt} className={styles.checkboxInput} />
              <span className={styles.checkboxLabel}>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {type === "DATE" && (
        <input
          type="date"
          className={styles.input}
          aria-label={title}
        />
      )}
    </div>
  );
}
