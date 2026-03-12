import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { QuestionType, type Form, type Question } from "../../types";

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
  forms: [
    {
      id: "form-1",
      title: "Customer Satisfaction Survey",
      description: "Help us improve our service",
      questions: [
        {
          id: "q-1",
          title: "What is your name?",
          type: QuestionType.TEXT,
          options: [],
        },
        {
          id: "q-2",
          title: "How satisfied are you with our service?",
          type: QuestionType.MULTIPLE_CHOICE,
          options: ["Very satisfied", "Satisfied", "Neutral", "Unsatisfied"],
        },
        {
          id: "q-3",
          title: "Which features do you use?",
          type: QuestionType.CHECKBOX,
          options: ["Dashboard", "Analytics", "Reports", "Notifications"],
        },
        {
          id: "q-4",
          title: "When did you start using our product?",
          type: QuestionType.DATE,
          options: [],
        },
      ],
    },

    {
      id: "form-2",
      title: "Employee Feedback",
      description: "Internal company feedback form",
      questions: [
        {
          id: "q-5",
          title: "Employee name",
          type: QuestionType.TEXT,
          options: [],
        },
        {
          id: "q-6",
          title: "How would you rate your work environment?",
          type: QuestionType.MULTIPLE_CHOICE,
          options: ["Excellent", "Good", "Average", "Poor"],
        },
        {
          id: "q-7",
          title: "Which benefits do you value the most?",
          type: QuestionType.CHECKBOX,
          options: [
            "Health insurance",
            "Flexible hours",
            "Remote work",
            "Education support",
          ],
        },
      ],
    },

    {
      id: "form-3",
      title: "Event Registration",
      description: "Register for our upcoming event",
      questions: [
        {
          id: "q-8",
          title: "Full name",
          type: QuestionType.TEXT,
          options: [],
        },
        {
          id: "q-9",
          title: "Preferred session",
          type: QuestionType.MULTIPLE_CHOICE,
          options: ["Morning session", "Afternoon session", "Evening session"],
        },
        {
          id: "q-10",
          title: "Dietary preferences",
          type: QuestionType.CHECKBOX,
          options: ["Vegetarian", "Vegan", "Gluten-free", "No preference"],
        },
        {
          id: "q-11",
          title: "Arrival date",
          type: QuestionType.DATE,
          options: [],
        },
      ],
    },
  ],
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
  setBuilderDescription,
  setBuilderTitle,
  addQuestion,
  removeQuestion,
  updateQuestion,
  resetBuilder,
  saveForm,
} = formsSlice.actions;

export default formsSlice.reducer;
