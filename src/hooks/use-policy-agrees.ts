import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { policies } from '#/entities';
import { PolicyAgreement, PolicyType } from '#/types';
import { fitFetcher } from '#/utilities/fetch';

const AGREEMENTS_QUERY_KEY = '/v1/user/policy-agreement';
const AGREEMENTS_MUTATION_KEY = '/v1/user/policy-agreement';

export interface PolicyAgreesQueryResponse {
  policyAgreementList: {
    policyType: string;
    version: string;
    isAgree: boolean;
  }[];
}

export function usePolicyAgreesQuery() {
  return useSWR(AGREEMENTS_QUERY_KEY, async (url) => {
    const response = await fitFetcher<PolicyAgreesQueryResponse>(url);
    return response.policyAgreementList.map((p) => ({
      type: p.policyType,
      version: p.version,
      isAgreed: p.isAgree,
    })) as PolicyAgreement[];
  });
}

type PolicyAgreeArg = {
  type: PolicyType;
  isAgreed: boolean;
};

interface PolicyAgreesMutationResponse {
  policyAgreementList: {
    policyType: string;
    version: string;
    isAgree: boolean;
  }[];
}

export function usePolicyAgreesMutation() {
  return useSWRMutation(
    AGREEMENTS_MUTATION_KEY,
    async (url, { arg }: { arg: PolicyAgreeArg | PolicyAgreeArg[] }) => {
      const agrees = Array.isArray(arg) ? arg : [arg];
      const json = await fitFetcher<PolicyAgreesMutationResponse>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyAgreementList: agrees.map((agree) => ({
            policyType: agree.type,
            isAgree: agree.isAgreed,
            version: policies[agree.type].version,
          })),
        }),
      });
      return json.policyAgreementList.map((p) => ({
        type: p.policyType,
        version: p.version,
        isAgreed: p.isAgree,
      })) as PolicyAgreement[];
    }
  );
}
