'use server';

import { PolicyAgreement, PolicyType } from '#/entities/policy';
import { User } from '#/types/user';
import { fitFetch } from '#/utilities/fetch';

export async function getMe(): Promise<User | null> {
  const response = await fitFetch(`/v1/user`);
  const json = (await response.json()) as User;

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error(`Failed to get user: ${response.status} ${JSON.stringify(json)}`);
  }
  return json;
}

type UpdateMeRequest = Partial<Omit<User, 'id' | 'status'>>;
type UpdateMeResponse = Partial<Omit<User, 'id'>>;

export async function updateMe(user: UpdateMeRequest): Promise<UpdateMeResponse> {
  const response = await fitFetch(`/v1/user`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  });
  const json = (await response.json()) as UpdateMeResponse;

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.status} ${JSON.stringify(json)}`);
  }
  return json;
}

interface GetPolicyAgreementsResponse {
  policyAgreementList: {
    policyType: string;
    version: string;
    isAgree: boolean;
  }[];
}

export async function getPolicyAgreements(): Promise<PolicyAgreement[]> {
  const response = await fitFetch(`/v1/user/policy-agreement`);
  const json = (await response.json()) as GetPolicyAgreementsResponse;
  const policyAgreements = json.policyAgreementList.map((agreement) => ({
    type: getPolicyType(agreement.policyType),
    version: agreement.version,
    isAgree: agreement.isAgree,
  }));
  return policyAgreements;
}

interface UpdatePolicyAgreementsRequest {
  policyAgreementList: {
    isAgree: boolean;
    policyType: PolicyType;
    version: string;
  }[];
}

interface UpdatePolicyAgreementsResponse {
  policyAgreementList: {
    isAgree: boolean;
    policyType: string;
    version: string;
    updatedAt: string;
  }[];
}

export async function updatePolicyAgreements(
  agreements: PolicyAgreement[]
): Promise<PolicyAgreement[]> {
  if (agreements.length === 0) {
    return [];
  }

  const response = await fitFetch(`/v1/user/policy-agreement`, {
    method: 'PUT',
    body: JSON.stringify({
      policyAgreementList: agreements.map((agreement) => ({
        isAgree: agreement.isAgree,
        policyType: agreement.type,
        version: agreement.version,
      })),
    } as UpdatePolicyAgreementsRequest),
  });
  const json = (await response.json()) as UpdatePolicyAgreementsResponse;

  if (!response.ok) {
    throw new Error(
      `Failed to update policy agreements: ${response.status} ${JSON.stringify(json)}`
    );
  }
  const policyAgreements = json.policyAgreementList.map((agreement) => ({
    type: getPolicyType(agreement.policyType),
    version: agreement.version,
    isAgree: agreement.isAgree,
  }));
  return policyAgreements;
}

function getPolicyType(policyType: string): PolicyType {
  if (policyType !== 'SERVICE_POLICY' && policyType !== 'PRIVACY_POLICY') {
    throw new Error(`Invalid policy type: ${policyType}`);
  }
  return policyType;
}
