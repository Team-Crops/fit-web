import Image from 'next/image';

import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { Txt } from '#atoms/Text';
import { UserProfile } from '#atoms/UserProfile';

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const BubbleContainer = styled.div<{ myBubble: TalkBubbleProps['myBubble'] }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ myBubble }) => (myBubble ? 'flex-end' : 'flex-start')};
  gap: 10px;
`;

const UserName = styled(Txt)``;

const TextBubble = styled(Txt)<{ myBubble: TalkBubbleProps['myBubble'] }>`
  background: #fff;
  padding: 20px 35px 20px 25px;
  border: ${({ myBubble }) => (myBubble ? '1px solid #FFA7A5' : 'none')};
  border-radius: ${({ myBubble }) => (myBubble ? '40px 0 40px 40px' : '0 40px 40px 40px')};
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.08));
  line-height: 2;
`;

const BubbleTime = styled(Txt)`
  margin-top: auto;
  white-space: nowrap;
`;

interface TalkBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  myBubble?: boolean;
  user: User;
}

export const TalkBubble = ({ myBubble = false, user, ...props }: TalkBubbleProps) => {
  return (
    <Container>
      {myBubble && (
        <BubbleTime size="typo6" weight="medium" color="#9E9E9E">
          12:24 PM
        </BubbleTime>
      )}
      {!myBubble && <UserProfile imageUrl={user.profileImageUrl} nickname={user.nickname} />}
      <BubbleContainer myBubble={myBubble}>
        <UserName size="typo5" weight="bold" color="#757575">
          {user.nickname}
        </UserName>
        <TextBubble myBubble={myBubble} size="typo4" weight="regular" color="#424242" {...props} />
      </BubbleContainer>
      {myBubble && <UserProfile imageUrl={user.profileImageUrl} nickname={user.nickname} />}
      {!myBubble && (
        <BubbleTime size="typo6" weight="medium" color="#9E9E9E">
          12:24 PM
        </BubbleTime>
      )}
    </Container>
  );
};
