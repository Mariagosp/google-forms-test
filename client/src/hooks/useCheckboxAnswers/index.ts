import { useState } from "react";

export function useCheckboxAnswers(onChange: (value: string[]) => void) {
  const [values, setValues] = useState<string[]>([]);

  const toggle = (opt: string) => {
    const next = values.includes(opt)
      ? values.filter((v) => v !== opt)
      : [...values, opt];
    setValues(next);
    onChange(next);
  };

  return { values, toggle };
}

