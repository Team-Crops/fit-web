import Image from 'next/image';

import styled from '@emotion/styled';

import { Icons } from './Icons';

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  nickname?: string;
  size?: number;
}

export const UserProfile = ({ imageUrl, nickname, size = 48, ...props }: UserProfileProps) => {
  const alt = nickname ? `${nickname}'s profile image` : 'profile image';

  if (imageUrl) {
    return <ProfileImage src={imageUrl} alt={alt} width={size} height={size} {...props} />;
  }

  return <Icons icon="account" width={size} height={size} />;
};
