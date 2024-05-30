import { IconName } from '#/components/atoms/Icons';
import { Link } from '#/types';

export function getIconByLinkType(linkType: Link['linkType']): IconName {
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
