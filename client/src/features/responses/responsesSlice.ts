import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Answer, FormResponse } from "../../types";

type ResponsesState = {
  responses: FormResponse[];
  answers: Answer[];
  isSubmitted: boolean;
};

const initialState: ResponsesState = {
  responses: [
    {
      id: "r1",
      formId: "form-1",
      answers: [
        { questionId: "q-1", value: "John Doe" },
        { questionId: "q-2", value: "Very satisfied" },
        { questionId: "q-3", value: ["Dashboard", "Analytics"] },
        { questionId: "q-4", value: "2024-01-15" },
      ],
    },
    {
      id: "r2",
      formId: "form-1",
      answers: [
        { questionId: "q-1", value: "Jane Smith" },
        { questionId: "q-2", value: "Satisfied" },
        { questionId: "q-3", value: ["Reports", "Notifications"] },
        { questionId: "q-4", value: "2024-02-20" },
      ],
    },
    {
      id: "r3",
      formId: "form-2",
      answers: [
        { questionId: "q-5", value: "Alex Brown" },
        { questionId: "q-6", value: "Good" },
        {
          questionId: "q-7",
          value: ["Health insurance", "Remote work"],
        },
      ],
    },
    {
      id: "r4",
      formId: "form-3",
      answers: [
        { questionId: "q-8", value: "Sam Wilson" },
        { questionId: "q-9", value: "Morning session" },
        { questionId: "q-10", value: ["Vegetarian"] },
        { questionId: "q-11", value: "2025-03-15" },
      ],
    },
  ],
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
  addResponse,
  setAnswer,
  clearAnswers,
  setSubmitted,
} = responsesSlice.actions;

export default responsesSlice.reducer;
