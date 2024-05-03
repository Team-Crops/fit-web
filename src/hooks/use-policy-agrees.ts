import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { PolicyAgreement, PolicyType, policies } from '#/types/policy';
import { fitFetch, fitFetcher } from '#/utilities/fetch';

const AGREEMENTS_QUERY_KEY = '/v1/user/policy-agreement';
const AGREEMENTS_MUTATION_KEY = '/v1/user/policy-agreement';

export interface PolicyAgreesQueryResponse {
  policyAgreementList: PolicyAgreement[];
}

export function usePolicyAgreesQuery() {
  const { data, ...others } = useSWR<PolicyAgreesQueryResponse>(AGREEMENTS_QUERY_KEY, fitFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  return {
    data: data?.policyAgreementList,
    ...others,
  };
}

type PolicyAgreesMutationArgs =
  | {
      type: PolicyType;
      isAgree: boolean;
    }
  | {
      type: PolicyType;
      isAgree: boolean;
    }[];

interface PolicyAgreesMutationResponse {
  policyAgreementList: PolicyAgreement[];
}

async function sendPolicyAgreesMutationRequest(
  url: string,
  { arg }: { arg: PolicyAgreesMutationArgs }
) {
  const response = await fitFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      policyAgreementList: Array.isArray(arg)
        ? arg.map((agree) => ({
            policyType: agree.type,
            isAgree: agree.isAgree,
            version: policies[agree.type].version,
          }))
        : [{ policyType: arg.type, isAgree: arg.isAgree, version: policies[arg.type].version }],
    }),
  });
  const json = await response.json();
  return json as PolicyAgreesMutationResponse;
}

export function usePolicyAgreesMutation() {
  const { data, ...others } = useSWRMutation(
    AGREEMENTS_MUTATION_KEY,
    sendPolicyAgreesMutationRequest,
    {
      onSuccess: (data) => mutate(AGREEMENTS_QUERY_KEY, data.policyAgreementList),
    }
  );
  return {
    data: data?.policyAgreementList,
    ...others,
  };
}
