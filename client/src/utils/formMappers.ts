import type { GetFormsQuery, GetResponsesQuery, Form as GqlForm } from "../services/generatedApi";
import type { Form as DomainForm } from "../services/generatedApi";
import type { Response as DomainResponse } from "../services/generatedApi";

export function mapGqlFormToDomainForm(gqlForm: GqlForm): DomainForm {
  return {
    id: gqlForm.id,
    title: gqlForm.title,
    questions: gqlForm.questions.map((question) => ({
      id: question.id,
      title: question.title,
      type: question.type,
      options: question.options ?? undefined,
    })),
    description: gqlForm.description ?? undefined,
  };
}

export function mapGqlFormsToDomainForms(
  gqlForms: GetFormsQuery["forms"]
): DomainForm[] {
  return gqlForms.map((form) => ({
    id: form.id,
    title: form.title,
    description: form.description ?? "",
    questions: form.questions.map((q) => ({
      id: q.id,
      title: q.title,
      type: q.type,
      options: q.options ?? [],
    })),
  }));
}

export function mapGqlResponsesToDomainResponses(
  gqlResponses: GetResponsesQuery["responses"] | null | undefined
): DomainResponse[] {
  if (!gqlResponses) return [];
  return gqlResponses.map((r) => ({
    id: r.id,
    formId: r.formId,
    answers: r.answers.map((a) => ({
      questionId: a.questionId,
      value: a.value,
    })),
  }));
}
