import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Chat as ChatBox } from './Chat';
import { ChatParticipants } from './ChatParticipants';

interface ChatRoomProps {
  projectId?: number;
  matchingId?: number;
}

export const ChatRoom = ({ projectId, matchingId }: ChatRoomProps) => {
  const participantsContainerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (participantsContainerRef.current) {
      const targetHeight = participantsContainerRef.current.offsetHeight;
      setHeight(targetHeight);
    }
  }, [participantsContainerRef.current?.offsetHeight]);

  return (
    <Container height={height}>
      <ChatParticipantsContainer ref={participantsContainerRef}>
        <ChatParticipants projectId={projectId} matchingId={matchingId} />
      </ChatParticipantsContainer>
      <ChatContainer>
        <ChatBox projectId={projectId} matchingId={matchingId} />
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div<{ height?: number | null }>`
  position: relative;

  display: flex;

  width: 100%;
  max-width: 1200px;
  height: ${({ height }) => (height ? `${height}px` : 'fit-content')};

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
