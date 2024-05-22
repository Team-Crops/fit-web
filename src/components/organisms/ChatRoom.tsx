import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useMatchingRoom, useProject } from '#/stores';
import { ChatUser } from '#/types';
import { Chat } from './Chat';
import { ChatParticipants } from './ChatParticipants';

interface ChatRoomProps {
  projectId?: number;
  matchingId?: number;
}

export const ChatRoom = ({ projectId, matchingId }: ChatRoomProps) => {
  const [participants, setParticipants] = useState<ChatUser[]>([]);

  const matchingRoomState = useMatchingRoom(matchingId);
  const projectState = useProject(projectId);

  useEffect(() => {
    if (projectState?.data?.members) {
      setParticipants(projectState.data.members);
    } else if (matchingRoomState?.data?.matchingUsers) {
      setParticipants(matchingRoomState.data.matchingUsers);
    }
  }, [matchingRoomState.data?.matchingUsers, projectState.data?.members]);

  return (
    <Container>
      <ChatParticipantsContainer>
        <ChatParticipants projectId={projectId} participants={participants} />
      </ChatParticipantsContainer>
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;

  width: 100%;
  max-width: 1200px;

  border: 1px solid #e0e0e0;
  border-radius: 12px;
`;

const ChatParticipantsContainer = styled.div`
  flex: 1 1 50%;
  padding: 30px 60px;
`;

const ChatContainer = styled.div`
  flex: 1 1 50%;
`;
