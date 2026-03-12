import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Form,
  FormResponse,
  Answer,
} from "../../types";

const graphqlBase = "http://localhost:3000/graphql";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface FormsData {
  forms: Form[];
}

interface FormData {
  form: Form | null;
}

interface ResponsesData {
  responses: FormResponse[] | FormResponse;
}

interface CreateFormVariables {
  title: string;
  description?: string;
  questions?: Array<{ title: string; type: string; options?: string[] }>;
}

interface CreateFormData {
  createForm: Form;
}

interface SubmitResponseData {
  submitResponse: FormResponse;
}

function normalizeResponses(
  raw: FormResponse[] | FormResponse | undefined
): FormResponse[] {
  if (raw == null) return [];
  return Array.isArray(raw) ? raw : [raw];
}

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: graphqlBase,
  }),
  tagTypes: ["Forms", "Form", "Responses"],
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetForms {
              forms {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
        },
      }),
      transformResponse: (response: GraphQLResponse<FormsData>) =>
        response.data?.forms ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Form" as const, id })),
              { type: "Forms", id: "LIST" },
            ]
          : [{ type: "Forms", id: "LIST" }],
    }),

    getForm: builder.query<Form | null, string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetForm($id: String!) {
              form(id: $id) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
          variables: { id },
        },
      }),
      transformResponse: (response: GraphQLResponse<FormData>) =>
        response.data?.form ?? null,
      providesTags: (_result, _error, id) => [{ type: "Form", id }],
    }),

    getResponses: builder.query<FormResponse[], string>({
      query: (formId) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query GetResponses($formId: String!) {
              responses(formId: $formId) {
                id
                formId
                answers {
                  questionId
                  value
                }
              }
            }
          `,
          variables: { formId },
        },
      }),
      transformResponse: (response: GraphQLResponse<ResponsesData>) =>
        normalizeResponses(response.data?.responses),
      providesTags: (_result, _error, formId) => [
        { type: "Responses", id: formId },
      ],
    }),

    createForm: builder.mutation<Form, CreateFormVariables>({
      query: (variables) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
              createForm(title: $title, description: $description, questions: $questions) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
          variables,
        },
      }),
      transformResponse: (response: GraphQLResponse<CreateFormData>) =>
        response.data!.createForm,
      invalidatesTags: [{ type: "Forms", id: "LIST" }],
    }),

    submitResponse: builder.mutation<
      FormResponse,
      { formId: string; answers: Answer[] }
    >({
      query: (arg) => ({
        url: "",
        method: "POST",
        body: {
          query: `
              mutation SubmitResponse($formId: String!, $answers: [AnswerInput!]!) {
                submitResponse(formId: $formId, answers: $answers) {
                  id
                  formId
                  answers {
                    questionId
                    value
                  }
                }
              }
            `,
          variables: {
            formId: arg.formId,
            answers: arg.answers.map((a) => ({
              questionId: a.questionId,
              value: Array.isArray(a.value) ? a.value : [a.value],
            })),
          },
        },
      }),
      transformResponse: (response: GraphQLResponse<SubmitResponseData>) =>
        response.data!.submitResponse,
      invalidatesTags: (_result, _error, { formId }) => [
        { type: "Responses", id: formId },
      ],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;
