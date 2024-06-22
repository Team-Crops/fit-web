export interface LinkList {
  linkUrl: string;
  linkType: LinkType;
  isPortfolio?: boolean;
}

export type LinkType =
  | 'LINK'
  | 'FACEBOOK'
  | 'GITHUB'
  | 'VELOG'
  | 'LINKEDIN'
  | 'INSTAGRAM'
  | 'TISTORY';
