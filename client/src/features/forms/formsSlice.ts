import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Form, Question } from "../../services/generatedApi";

export interface FormsState {
  forms: Form[];
  currentForm: Form | null;
  builder: {
    title: string;
    description: string;
    questions: Question[];
  };
}

const initialState: FormsState = {
  forms: [],
  currentForm: null,
  builder: {
    title: "",
    description: "",
    questions: [],
  },
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms(state, action: PayloadAction<Form[]>) {
      state.forms = action.payload;
    },

    setCurrentForm(state, action: PayloadAction<Form>) {
      state.currentForm = action.payload;
    },

    mergeForm(state, action: PayloadAction<Form>) {
      const idx = state.forms.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) {
        state.forms[idx] = action.payload;
      } else {
        state.forms.push(action.payload);
      }
    },

    setBuilderTitle(state, action: PayloadAction<string>) {
      state.builder.title = action.payload;
    },

    setBuilderDescription(state, action: PayloadAction<string>) {
      state.builder.description = action.payload;
    },

    addQuestion(state, action: PayloadAction<Question>) {
      state.builder.questions.push(action.payload);
    },

    removeQuestion(state, action: PayloadAction<string>) {
      state.builder.questions = state.builder.questions.filter(
        (q) => q.id !== action.payload
      );
    },

    updateQuestion(state, action: PayloadAction<Question>) {
      const index = state.builder.questions.findIndex(
        (q) => q.id === action.payload.id
      );

      if (index !== -1) {
        state.builder.questions[index] = action.payload;
      }
    },

    resetBuilder(state) {
      state.builder = {
        title: "",
        description: "",
        questions: [],
      };
    },

    saveForm(state) {
      const { title, description, questions } = state.builder;
      if (!title.trim()) return;
      const formId = `form-${Date.now()}`;
      state.forms.push({
        id: formId,
        title: title.trim(),
        description: description.trim() || undefined,
        questions: questions.map((q, i) => ({
          ...q,
          id: q.id || `q-${formId}-${i}`,
        })),
      });
      state.builder = {
        title: "",
        description: "",
        questions: [],
      };
    },
  },
});

export const {
  setForms,
  setCurrentForm,
  mergeForm,
  setBuilderDescription,
  setBuilderTitle,
  addQuestion,
  removeQuestion,
  updateQuestion,
  resetBuilder,
  saveForm,
} = formsSlice.actions;

export default formsSlice.reducer;
