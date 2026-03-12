import { useState } from "react";
import type { QuestionType } from "../../types";
import styles from "./QuestionRenderer.module.css";

type QuestionRendererProps = {
  type: QuestionType;
  title: string;
  options: string[];
  questionId: string;
  onChange: (value: string | string[]) => void;
};

export default function QuestionRenderer({
  type,
  title,
  options,
  questionId, 
  onChange
}: QuestionRendererProps) {
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);

  const toggleCheckbox = (opt: string) => {
    const newVals = checkboxValues.includes(opt)
      ? checkboxValues.filter((v) => v !== opt)
      : [...checkboxValues, opt];
    setCheckboxValues(newVals);
    onChange(newVals);
  };

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
              <input type="radio" name={`q-${title}`} value={opt} className={styles.radioInput} onChange={(e) => onChange(e.target.value)} />
              <span className={styles.radioLabel}>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {type === "CHECKBOX" && (
        <div className={styles.optionGroup} role="group">
        {options.map((opt, i) => (
          <label key={i} className={styles.checkboxOption}>
            <input type="checkbox" value={opt} className={styles.checkboxInput} onChange={(e) => toggleCheckbox(opt)} />
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
