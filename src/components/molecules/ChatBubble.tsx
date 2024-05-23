import styled from '@emotion/styled';

import { ChatUser } from '#/types';
import { Txt } from '#atoms/Text';
import { UserProfile } from '#atoms/UserProfile';

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  myBubble?: boolean;
  user: ChatUser;
  text: string;
}

export const ChatBubble = ({ myBubble = false, user, text, ...props }: ChatBubbleProps) => {
  return (
    <Container myBubble={myBubble}>
      <ColoredProfile imageUrl={user.profileImageUrl} nickname={user.nickname} size={40} />
      <BubbleContainer myBubble={myBubble}>
        <Txt size="typo5" weight="bold" color="#757575">
          {user.nickname}
        </Txt>
        <TextBubble myBubble={myBubble} size="typo4" weight="regular" color="#424242" {...props}>
          {text}
        </TextBubble>
      </BubbleContainer>
      <BubbleTime size="typo6" weight="medium" color="#9E9E9E">
        12:24 PM
      </BubbleTime>
    </Container>
  );
};

const Container = styled.div<{ myBubble: boolean }>`
  display: flex;
  flex-direction: ${({ myBubble }) => (myBubble ? 'row-reverse' : 'row')};
  gap: 10px;
`;

const ColoredProfile = styled(UserProfile)`
  background-color: rgb(153 166 237 / 100%);
`;

const BubbleContainer = styled.div<{ myBubble: ChatBubbleProps['myBubble'] }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: ${({ myBubble }) => (myBubble ? 'flex-end' : 'flex-start')};
`;

const TextBubble = styled(Txt)<{ myBubble: ChatBubbleProps['myBubble'] }>`
  padding: 20px 32px;

  line-height: 2;

  background: #fff;
  filter: drop-shadow(0 0 40px rgb(0 0 0 / 8%));
  border: ${({ myBubble }) => (myBubble ? '1px solid #FFA7A5' : 'none')};
  border-radius: ${({ myBubble }) => (myBubble ? '40px 0 40px 40px' : '0 40px 40px 40px')};
`;

const BubbleTime = styled(Txt)`
  margin-top: auto;
  white-space: nowrap;
`;
