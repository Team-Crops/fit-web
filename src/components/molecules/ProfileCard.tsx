'use client';

import { useMemo } from 'react';
import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import _ from 'lodash';

import DesignerImage from '#/assets/images/position-designer.png';
import MobileDeveloperImage from '#/assets/images/position-mobile-developer.png';
import PlannerImage from '#/assets/images/position-planner.png';
import ServerDeveloperImage from '#/assets/images/position-server-developer.png';
import WebDeveloperImage from '#/assets/images/position-web-developer.png';
import { usePositionsQuery } from '#/hooks/use-positions';
import { User } from '#/types/user';
import { Badge } from '#atoms/Badge';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { UserProfile } from '#atoms/UserProfile';

const positionImages = [
  DesignerImage,
  MobileDeveloperImage,
  PlannerImage,
  ServerDeveloperImage,
  WebDeveloperImage,
];

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | null;
  size: 'small' | 'large';
  randomProfileImage?: boolean;
}

export const ProfileCard = ({ user, size, randomProfileImage, ...props }: ProfileCardProps) => {
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
      {randomProfileImage ? (
        <RoundImage
          src={positionImages[_.random(positionImages.length - 1)]}
          alt={`Profile image of ${user.nickname}`}
          width={size === 'small' ? 90 : 135}
          height={size === 'small' ? 90 : 135}
        />
      ) : (
        <UserProfile
          imageUrl={user.profileImageUrl}
          nickname={user.nickname}
          size={size === 'small' ? 90 : 135}
        />
      )}
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

const RoundImage = styled(Image)`
  background-color: rgb(255 199 198 / 100%);
  border-radius: 50%;
`;
