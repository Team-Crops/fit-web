export interface Link {
  linkUrl: string;
  linkType: LinkType;
}

export type LinkType =
  | 'LINK'
  | 'FACEBOOK'
  | 'GITHUB'
  | 'VELOG'
  | 'LINKEDIN'
  | 'INSTAGRAM'
  | 'TISTORY'
  | 'PORTFOLIO';
