import type { RootState } from "../../app/store";

export const selectResponses = (state: RootState) => state.responses.responses;

export const selectResponsesByFormId = (state: RootState, formId: string) =>
  state.responses.responses.filter((r) => r.formId === formId);
