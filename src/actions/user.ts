import { PolicyAgreement, PolicyType } from '#/entities/policy';
import { User } from '#/entities/user';

export async function getMe(): Promise<User> {
  const response = await fetch(`/v1/user`);
  const json = (await response.json()) as User;
  return json;
}

type UpdateMeRequest = Partial<Omit<User, 'id' | 'status'>>;
type UpdateMeResponse = Partial<Omit<User, 'id'>>;

export async function updateMe(user: UpdateMeRequest): Promise<UpdateMeResponse> {
  const response = await fetch(`/v1/user`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  });
  const json = (await response.json()) as Partial<Omit<User, 'id'>>;
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
  const response = await fetch(`/v1/user/policy-agreement`);
  const json = (await response.json()) as GetPolicyAgreementsResponse;
  const policyAgreements = json.policyAgreementList.map((agreement) => ({
    policyType: getPolicyType(agreement.policyType),
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
  const response = await fetch(`/v1/user/policy-agreement`, {
    method: 'PUT',
    body: JSON.stringify({ policyAgreementList: agreements } as UpdatePolicyAgreementsRequest),
  });
  const json = (await response.json()) as UpdatePolicyAgreementsResponse;
  const policyAgreements = json.policyAgreementList.map((agreement) => ({
    policyType: getPolicyType(agreement.policyType),
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
