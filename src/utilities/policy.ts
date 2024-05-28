import { policies } from '#/entities';
import { PolicyAgreement } from '#/types';

export function checkPolicyAgreed(policyAgrees: PolicyAgreement[]): boolean {
  return Object.values(policies).every(
    (policy) => policyAgrees.find((agreed) => agreed.type === policy.type)?.isAgreed === true
  );
}
