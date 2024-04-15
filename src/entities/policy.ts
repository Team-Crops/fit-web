export type PolicyType = 'SERVICE_POLICY' | 'PRIVACY_POLICY';

export interface PolicyAgreement {
  type: PolicyType;
  version: string;
  isAgree: boolean;
}

interface Policy {
  type: PolicyType;
  title: string;
  text: string;
  required: boolean;
  version: string;
}

export const policies: Record<PolicyType, Policy> = {
  SERVICE_POLICY: {
    type: 'SERVICE_POLICY',
    title: '서비스 이용 동의 (필수)',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Est placerat in egestas erat imperdiet. Etiam erat velit scelerisque in dictum. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Nisl pretium fusce id velit ut tortor. Ultricies mi eget mauris pharetra. Tempor nec feugiat nisl pretium fusce id. Tincidunt id aliquet risus feugiat in ante metus. Egestas maecenas pharetra convallis posuere morbi. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Consequat interdum varius sit amet.',
    required: true,
    version: '1.0.0',
  },
  PRIVACY_POLICY: {
    type: 'PRIVACY_POLICY',
    title: '개인정보 수집 및 이용 동의 (필수)',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Est placerat in egestas erat imperdiet. Etiam erat velit scelerisque in dictum. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Nisl pretium fusce id velit ut tortor. Ultricies mi eget mauris pharetra. Tempor nec feugiat nisl pretium fusce id. Tincidunt id aliquet risus feugiat in ante metus. Egestas maecenas pharetra convallis posuere morbi. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Consequat interdum varius sit amet.',
    required: true,
    version: '1.0.0',
  },
};
