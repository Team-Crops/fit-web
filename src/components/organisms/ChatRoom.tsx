import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [height, setHeight] = useState<number | null>(null);

  const matchingRoomState = useMatchingRoom(matchingId);
  const projectState = useProject(projectId);

  const chatId = useMemo(
    () => matchingRoomState.data?.chatId ?? projectState.data?.chatId,
    [matchingRoomState.data?.chatId, projectState.data?.chatId]
  );

  const participantsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectState?.data?.members) {
      setParticipants(projectState.data.members);
    } else if (matchingRoomState?.data?.matchingUsers) {
      setParticipants(matchingRoomState.data.matchingUsers);
    }
  }, [matchingRoomState.data?.matchingUsers, projectState.data?.members]);

  useEffect(() => {
    if (participantsContainerRef.current) {
      const targetHeight = participantsContainerRef.current.offsetHeight;
      setHeight(targetHeight);
    }
  }, [participantsContainerRef.current?.offsetHeight]);

  return (
    <Container height={height}>
      <ChatParticipantsContainer ref={participantsContainerRef}>
        <ChatParticipants projectId={projectId} participants={participants} />
      </ChatParticipantsContainer>
      <ChatContainer>{chatId && <Chat chatId={chatId} />}</ChatContainer>
    </Container>
  );
};

const Container = styled.div<{ height?: number | null }>`
  position: relative;

  overflow: hidden;
  display: flex;

  width: 100%;
  max-width: 1200px;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};

  border: 1px solid #e0e0e0;
  border-radius: 12px;
`;

const ChatParticipantsContainer = styled.div`
  flex: 1 1 50%;
  height: fit-content;
  padding: 30px 60px;
`;

const ChatContainer = styled.div`
  flex: 1 1 50%;
`;
