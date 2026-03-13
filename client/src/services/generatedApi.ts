import { api } from "./api";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type TypedDocumentString<TResult, TVariables> = string & {
  __apiType?: { result: TResult; variables: TVariables };
};

export type Answer = {
  __typename?: "Answer";
  questionId: Scalars["ID"]["output"];
  value: Array<Scalars["String"]["output"]>;
};

export type AnswerInput = {
  questionId: Scalars["ID"]["input"];
  value: Array<Scalars["String"]["input"]>;
};

export type Form = {
  __typename?: "Form";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  questions: Array<Question>;
  title: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createForm: Form;
  submitResponse: Response;
};

export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars["String"]["input"];
};

export type MutationSubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  form?: Maybe<Form>;
  forms: Array<Form>;
  hello: Scalars["String"]["output"];
  responses?: Maybe<Array<Response>>;
};

export type QueryFormArgs = {
  id: Scalars["String"]["input"];
};

export type QueryResponsesArgs = {
  formId: Scalars["String"]["input"];
};

export type Question = {
  __typename?: "Question";
  id: Scalars["ID"]["output"];
  options?: Maybe<Array<Scalars["String"]["output"]>>;
  title: Scalars["String"]["output"];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
  type: QuestionType;
};

export type QuestionType =
  | "CHECKBOX"
  | "DATE"
  | "MULTIPLE_CHOICE"
  | "TEXT";

export const QuestionType = {
  Checkbox: "CHECKBOX",
  Date: "DATE",
  MultipleChoice: "MULTIPLE_CHOICE",
  Text: "TEXT",
} as const;

export type Response = {
  __typename?: "Response";
  answers: Array<Answer>;
  formId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
};

export type CreateFormMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  questions?: InputMaybe<Array<QuestionInput> | QuestionInput>;
}>;

export type CreateFormMutation = {
  __typename?: "Mutation";
  createForm: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    questions: Array<{
      __typename?: "Question";
      id: string;
      title: string;
      type: QuestionType;
      options?: Array<string> | null;
    }>;
  };
};

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars["String"]["input"];
  answers: Array<AnswerInput> | AnswerInput;
}>;

export type SubmitResponseMutation = {
  __typename?: "Mutation";
  submitResponse: {
    __typename?: "Response";
    id: string;
    formId: string;
    answers: Array<{
      __typename?: "Answer";
      questionId: string;
      value: Array<string>;
    }>;
  };
};

export type GetFormQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetFormQuery = {
  __typename?: "Query";
  form?: {
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    questions: Array<{
      __typename?: "Question";
      id: string;
      title: string;
      type: QuestionType;
      options?: Array<string> | null;
    }>;
  } | null;
};

export type GetFormsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFormsQuery = {
  __typename?: "Query";
  forms: Array<{
    __typename?: "Form";
    id: string;
    title: string;
    description?: string | null;
    questions: Array<{
      __typename?: "Question";
      id: string;
      title: string;
      type: QuestionType;
      options?: Array<string> | null;
    }>;
  }>;
};

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars["String"]["input"];
}>;

export type GetResponsesQuery = {
  __typename?: "Query";
  responses?: Array<{
    __typename?: "Response";
    id: string;
    formId: string;
    answers: Array<{
      __typename?: "Answer";
      questionId: string;
      value: Array<string>;
    }>;
  }> | null;
};

export const CreateFormDocument = `
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
    `;
export const SubmitResponseDocument = `
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
    `;
export const GetFormDocument = `
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
    `;
export const GetFormsDocument = `
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
    `;
export const GetResponsesDocument = `
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
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>(
      {
        query: (variables) => ({ document: CreateFormDocument, variables }),
      }
    ),
    SubmitResponse: build.mutation<
      SubmitResponseMutation,
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables }),
    }),
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables }),
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const {
  useCreateFormMutation,
  useSubmitResponseMutation,
  useGetFormQuery,
  useLazyGetFormQuery,
  useGetFormsQuery,
  useLazyGetFormsQuery,
  useGetResponsesQuery,
  useLazyGetResponsesQuery,
} = injectedRtkApi;
