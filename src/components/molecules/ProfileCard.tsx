'use client';

import { useMemo } from 'react';
import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { useGetPositionsQuery } from '#/redux/features/skill-set/api';
import { Badge } from '#atoms/Badge';
import { Txt } from '#atoms/Text';

const Container = styled.div<{ size: ProfileCardProps['size'] }>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 16px 40px;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          max-width: 360px;
          height: 120px;
          gap: 30px;
        `;
      case 'large':
        return css`
          max-width: 600px;
          gap: 40px;
        `;
    }
  }}
`;

const ProfileImage = styled(Image)<{ size: ProfileCardProps['size'] }>`
  border-radius: 120px;
  background: #f5f5f5;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          min-width: 90px;
          width: 90px;
          height: 90px;
        `;
      case 'large':
        return css`
          min-width: 120px;
          width: 120px;
          height: 120px;
        `;
    }
  }}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const IntroduceText = styled(Txt)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  line-height: 170%;
`;

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
  size: 'small' | 'large';
}

export function ProfileCard({ user, size, ...props }: ProfileCardProps) {
  const { data: positions } = useGetPositionsQuery();

  const positionName = useMemo(() => {
    const position = positions?.find((v) => v.id === user.positionId);
    return position?.displayName;
  }, [positions, user.positionId]);

  return (
    <Container size={size} {...props}>
      <ProfileImage
        src={user.profileImageUrl ?? ''}
        alt={`${user.nickname}'s profile image`}
        size={size}
        width={size === 'small' ? 90 : 120}
        height={size === 'small' ? 90 : 120}
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
}
