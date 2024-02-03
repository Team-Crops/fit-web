interface Policy {
  title: string;
  text: string;
  required: boolean;
}

export type PolicyName = 'service' | 'privacy';

export const Policies: Record<PolicyName, Policy> = {
  service: {
    title: '서비스 이용 동의 (필수)',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Est placerat in egestas erat imperdiet. Etiam erat velit scelerisque in dictum. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Nisl pretium fusce id velit ut tortor. Ultricies mi eget mauris pharetra. Tempor nec feugiat nisl pretium fusce id. Tincidunt id aliquet risus feugiat in ante metus. Egestas maecenas pharetra convallis posuere morbi. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Consequat interdum varius sit amet.',
    required: true,
  },
  privacy: {
    title: '개인정보 수집 및 이용 동의 (필수)',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Est placerat in egestas erat imperdiet. Etiam erat velit scelerisque in dictum. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Nisl pretium fusce id velit ut tortor. Ultricies mi eget mauris pharetra. Tempor nec feugiat nisl pretium fusce id. Tincidunt id aliquet risus feugiat in ante metus. Egestas maecenas pharetra convallis posuere morbi. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Consequat interdum varius sit amet.',
    required: true,
  },
};
