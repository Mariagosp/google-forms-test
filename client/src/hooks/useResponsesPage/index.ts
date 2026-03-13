import { useGetFormQuery, useGetResponsesQuery } from "../../services/generatedApi";
import { mapGqlFormToDomainForm, mapGqlResponsesToDomainResponses } from "../../utils/formMappers";

export function useResponsesPage(formId: string) {
  const formQuery = useGetFormQuery({ id: formId }, { skip: !formId });
  const responsesQuery = useGetResponsesQuery(
    { formId },
    { skip: !formId, refetchOnMountOrArgChange: true }
  );

  const form = formQuery.data?.form
    ? mapGqlFormToDomainForm(formQuery.data.form)
    : undefined;

  const responses = mapGqlResponsesToDomainResponses(
    responsesQuery.data?.responses
  );

  return {
    form,
    responses,
    isLoading: formQuery.isLoading,
  };
}