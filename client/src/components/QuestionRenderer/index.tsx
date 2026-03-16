import type { QuestionType } from "../../services/generatedApi";
import styles from "./QuestionRenderer.module.css";

type QuestionRendererProps = {
  type: QuestionType;
  title: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
};

export default function QuestionRenderer({
  type,
  title,
  options,
  value,
  onChange,
}: QuestionRendererProps) {
  const toggleCheckbox = (opt: string) => {
    const current = Array.isArray(value) ? value : [];
    const next = current.includes(opt)
      ? current.filter((v) => v !== opt)
      : [...current, opt];
    onChange(next);
  };

  return (
    <div className={styles.question}>
      <label className={styles.label}>{title}</label>

      {type === "TEXT" && (
        <input
          type="text"
          className={styles.input}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your answer"
        />
      )}

      {type === "MULTIPLE_CHOICE" && (
        <div className={styles.optionGroup} role="radiogroup">
          {options.map((opt, i) => (
            <label key={i} className={styles.radioOption}>
              <input
                type="radio"
                name={`q-${title}`}
                value={opt}
                checked={value === opt}
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
                checked={Array.isArray(value) && value.includes(opt)}
                className={styles.checkboxInput}
                onChange={() => toggleCheckbox(opt)}
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
          value={typeof value === "string" ? value : ""}
          aria-label={title}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
