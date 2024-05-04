import styled from '@emotion/styled';

import { Chat } from './Chat';
import { ChatParticipants } from './ChatParticipants';

export const ChatRoom: React.FC = () => {
  return (
    <Container>
      <ChatParticipantsContainer>
        <ChatParticipants />
      </ChatParticipantsContainer>
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  display: flex;

  width: 100%;
  max-width: 1200px;

  border: 1px solid #e0e0e0;
  border-radius: 12px;
`;

const ChatParticipantsContainer = styled.div`
  flex: 1 1 50%;
`;

const ChatContainer = styled.div`
  flex: 1 1 50%;
`;
