import type { QuestionType } from "../../services/generatedApi";
import { useCheckboxAnswers } from "../../hooks";
import styles from "./QuestionRenderer.module.css";

type QuestionRendererProps = {
  type: QuestionType;
  title: string;
  options: string[];
  onChange: (value: string | string[]) => void;
};

export default function QuestionRenderer({
  type,
  title,
  options,
  onChange,
}: QuestionRendererProps) {
  const { toggle } = useCheckboxAnswers((vals) => onChange(vals));

  return (
    <div className={styles.question}>
      <label className={styles.label}>{title}</label>

      {type === "TEXT" && (
        <input
          type="text"
          className={styles.input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your answer"
        />
      )}

      {type === "MULTIPLE_CHOICE" && (
        <div className={styles.optionGroup} role="group">
          {options.map((opt, i) => (
            <label key={i} className={styles.radioOption}>
              <input
                type="radio"
                name={`q-${title}`}
                value={opt}
                className={styles.radioInput}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className={styles.radioLabel}>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {type === "CHECKBOX" && (
        <div className={styles.optionGroup} role="group">
          {options.map((opt, i) => (
            <label key={i} className={styles.checkboxOption}>
              <input
                type="checkbox"
                value={opt}
                className={styles.checkboxInput}
                onChange={() => toggle(opt)}
              />
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
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
