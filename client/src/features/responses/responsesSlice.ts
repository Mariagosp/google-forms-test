import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Answer, Response as FormResponse } from "../../services/generatedApi";

type ResponsesState = {
  responses: FormResponse[];
  answers: Answer[];
  isSubmitted: boolean;
};

const initialState: ResponsesState = {
  responses: [],
  answers: [],
  isSubmitted: false,
};

const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    setResponses(state, action: PayloadAction<FormResponse[]>) {
      state.responses = action.payload;
    },

    setResponsesForForm(
      state,
      action: PayloadAction<{ formId: string; responses: FormResponse[] }>
    ) {
      const { formId, responses: next } = action.payload;
      state.responses = state.responses.filter((r) => r.formId !== formId);
      state.responses.push(...next);
    },

    addResponse(state, action: PayloadAction<FormResponse>) {
      state.responses.push(action.payload);
    },

    setAnswer(state, action: PayloadAction<Answer>) {
      const existing = state.answers.find(
        (a) => a.questionId === action.payload.questionId
      );
      if (existing) {
        existing.value = action.payload.value;
      } else {
        state.answers.push(action.payload);
      }
    },

    clearAnswers(state) {
      state.answers = [];
    },

    setSubmitted(state, action: PayloadAction<boolean>) {
      state.isSubmitted = action.payload;
    },
  },
});

export const {
  setResponses,
  setResponsesForForm,
  addResponse,
  setAnswer,
  clearAnswers,
  setSubmitted,
} = responsesSlice.actions;

export default responsesSlice.reducer;
