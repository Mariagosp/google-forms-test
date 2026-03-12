import type { RootState } from "../../app/store";

export const selectForms = (state: RootState) => state.forms.forms;

export const selectFormById = (state: RootState, formId: string) =>
  state.forms.forms.find((f) => f.id === formId);

export const selectBuilder = (state: RootState) => state.forms.builder;
