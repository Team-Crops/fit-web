import { IconName } from '#/components/atoms/Icons';
import { LinkType } from '#/types';

export function getIconByLinkType(linkType: LinkType): IconName {
  switch (linkType) {
    case 'FACEBOOK':
      return 'facebook';
    case 'GITHUB':
      return 'github';
    case 'VELOG':
      return 'velog';
    case 'LINKEDIN':
      return 'linkedin';
    case 'INSTAGRAM':
      return 'instagram';
    case 'TISTORY':
      return 'tistory';
    default:
      return 'link';
  }
}
