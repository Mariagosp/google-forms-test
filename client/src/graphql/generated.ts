import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  value: Array<Scalars['String']['output']>;
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  value: Array<Scalars['String']['input']>;
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars['String']['input'];
};


export type MutationSubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  hello: Scalars['String']['output'];
  responses?: Maybe<Array<Response>>;
};


export type QueryFormArgs = {
  id: Scalars['String']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type: QuestionType;
};

export const QuestionType = {
  Checkbox: 'CHECKBOX',
  Date: 'DATE',
  MultipleChoice: 'MULTIPLE_CHOICE',
  Text: 'TEXT'
} as const;

export type QuestionType = typeof QuestionType[keyof typeof QuestionType];
export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, title: string, type: QuestionType, options?: Array<string> | null }> }> };


export const GetFormsDocument = gql`
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

/**
 * __useGetFormsQuery__
 *
 * To run a query within a React component, call `useGetFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFormsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
      }
export function useGetFormsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
        }
// @ts-ignore
export function useGetFormsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetFormsQuery, GetFormsQueryVariables>;
// export function useGetFormsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetFormsQuery | undefined, GetFormsQueryVariables>;
export function useGetFormsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetFormsQuery, GetFormsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFormsQuery, GetFormsQueryVariables>(GetFormsDocument, options);
        }
export type GetFormsQueryHookResult = ReturnType<typeof useGetFormsQuery>;
export type GetFormsLazyQueryHookResult = ReturnType<typeof useGetFormsLazyQuery>;
export type GetFormsSuspenseQueryHookResult = ReturnType<typeof useGetFormsSuspenseQuery>;
export type GetFormsQueryResult = ApolloReactCommon.QueryResult<GetFormsQuery, GetFormsQueryVariables>;