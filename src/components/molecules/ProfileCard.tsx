'use client';

import { useMemo } from 'react';
import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { usePositionsQuery } from '#/hooks/use-positions';
import { User } from '#/types/user';
import { Badge } from '#atoms/Badge';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { UserProfile } from '#atoms/UserProfile';
import { ProfileBlock } from '../organisms/ProfileBlock';

const Container = styled.div<{ size: ProfileCardProps['size'] }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 120px;
  padding: 16px 40px;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          gap: 30px;
          max-width: 360px;
        `;
      case 'large':
        return css`
          gap: 40px;
          max-width: 600px;
        `;
    }
  }}
`;

const ProfileImage = styled(Image)`
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 120px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: start;

  width: calc(100% - 120px);
`;

const NameContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const IntroduceText = styled(Txt)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  line-height: 170%;

  -webkit-line-clamp: 2;
`;

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | null;
  size: 'small' | 'large';
}

export const ProfileCard = ({ user, size, ...props }: ProfileCardProps) => {
  const { data: positions } = usePositionsQuery();

  const positionName = useMemo(() => {
    const position = positions?.find((v) => v.id === user?.positionId);
    return position?.displayName;
  }, [positions, user?.positionId]);

  if (user === null) {
    return (
      <Container size={size} {...props}>
        <Icons
          icon="progress"
          style={{ animation: 'spin 2s linear infinite' }}
          width={90}
          height={90}
        />
        <Txt size="typo3" weight="regular" color="#616161">
          유저 정보를 불러오는 중입니다.
        </Txt>
      </Container>
    );
  }

  return (
    <Container size={size} {...props}>
      <UserProfile
        imageUrl={user.profileImageUrl}
        nickname={user.nickname}
        size={size === 'small' ? 90 : 120}
      />
      <InfoContainer>
        <NameContainer>
          <Txt size={size === 'small' ? 'typo5' : 'typo3'} weight="bold">
            {user.nickname}
          </Txt>
          <Badge>{positionName}</Badge>
        </NameContainer>
        <IntroduceText size={size === 'small' ? 'typo6' : 'typo5'} weight="medium" color="#616161">
          &quot;{user.introduce}&quot;
        </IntroduceText>
      </InfoContainer>
    </Container>
  );
};
