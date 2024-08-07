import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { ChatBubbles } from '#/components/molecules/ChatBubbles';
import { ChatToolbox } from '#/components/molecules/ChatToolbox';
import { MatchingRoom, Project } from '#/types';

interface ChatProps {
  projectId?: Project['id'];
  matchingId?: MatchingRoom['id'];
}

export const Chat = ({ projectId, matchingId }: ChatProps) => {
  return (
    <Container>
      <Header>
        <Txt size="typo4" weight="bold" color="#757575">
          채팅방
        </Txt>
      </Header>
      <ChatBubbles projectId={projectId} matchingId={matchingId} />
      <ChatToolboxContainer>
        <ChatToolbox projectId={projectId} matchingId={matchingId} />
      </ChatToolboxContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  height: 100%;

  background-color: #fafafa;
`;

const Header = styled.div`
  width: 100%;
  padding: 32px 0 20px 28px;

  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 32px rgb(0 0 0 / 5%);
`;

const ChatToolboxContainer = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 30px;

  background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 10000%) 50%);
`;
