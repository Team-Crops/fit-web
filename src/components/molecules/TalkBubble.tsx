import Image from 'next/image';

import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { Txt } from '#atoms/Text';
import { Icons } from '../atoms/Icons';

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const UserName = styled(Txt)``;

const TextBubble = styled(Txt)<{ tailPosition: TalkBubbleProps['tailPosition'] }>`
  background: #fff;
  padding: 20px 35px 20px 25px;
  border-radius: ${({ tailPosition }) =>
    tailPosition === 'left' ? '0 40px 40px 40px' : '40px 0 40px 40px'};
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.08));
  line-height: 2;
`;

interface TalkBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  tailPosition?: 'left' | 'right';
  user: User;
}

export function TalkBubble({ tailPosition = 'left', user, ...props }: TalkBubbleProps) {
  return (
    <Container>
      {user.profileImageUrl ? (
        <ProfileImage
          src={user.profileImageUrl}
          alt={`${user.nickname}'s profile image`}
          width={48}
          height={48}
        />
      ) : (
        <Icons icon="account" />
      )}
      <BubbleContainer>
        <UserName size="typo5" weight="bold" color="#757575">
          {user.nickname}
        </UserName>
        <TextBubble
          tailPosition={tailPosition}
          size="typo4"
          weight="regular"
          color="#424242"
          {...props}
        />
      </BubbleContainer>
    </Container>
  );
}
