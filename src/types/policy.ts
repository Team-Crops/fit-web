type Nested<T> = T | Nested<T>[];

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
  contents: { article: string; clause: Nested<string> }[];
}
