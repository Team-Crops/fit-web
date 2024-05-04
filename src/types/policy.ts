export type PolicyType = 'SERVICE_POLICY' | 'PRIVACY_POLICY';

export interface PolicyAgreement {
  policyType: PolicyType;
  version: string;
  isAgree: boolean;
}

export interface Policy {
  type: PolicyType;
  title: string;
  required: boolean;
  version: string;
}

export const policies: Record<PolicyType, Policy> = {
  SERVICE_POLICY: {
    type: 'SERVICE_POLICY',
    title: '서비스 이용 동의 (필수)',
    required: true,
    version: '1.0.0',
  },
  PRIVACY_POLICY: {
    type: 'PRIVACY_POLICY',
    title: '개인정보 수집 및 이용 동의 (필수)',
    required: true,
    version: '1.0.0',
  },
};
