import Image from 'next/image';

import styled from '@emotion/styled';

import { getStorageUrl } from '#/utilities';
import { Icons } from './Icons';

const ProfileImage = styled(Image)<{ width: number; height: number }>`
  overflow: hidden;
  flex-shrink: 0;

  width: ${({ width }) => width}px;
  max-width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  border-radius: 50%;
`;

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  nickname?: string | null;
  size?: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  imageUrl = null,
  nickname = null,
  size = 78,
  ...props
}) => {
  const alt = nickname ? `${nickname}'s profile image` : 'profile image';

  if (imageUrl) {
    return (
      <ProfileImage src={getStorageUrl(imageUrl)} alt={alt} width={size} height={size} {...props} />
    );
  }

  return <Icons icon="account" width={size} height={size} style={{ flexShrink: 0 }} />;
};
