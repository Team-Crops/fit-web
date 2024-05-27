import { useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { useMatchingRoomQuery } from '#/hooks/use-matching-room';
import { useProjectsQuery } from '#/hooks/use-projects';
import { useChatStore } from '#/stores';
import { Chat } from '#/types';
import { Chat as ChatBox } from './Chat';
import { ChatParticipants } from './ChatParticipants';

interface ChatRoomProps {
  projectId?: number;
  matchingId?: number;
}

export const ChatRoom = ({ projectId, matchingId }: ChatRoomProps) => {
  const participantsContainerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number | null>(null);
  const [chatId, setChatId] = useState<Chat['id'] | null>(null);

  const { data: matchingRoom } = useMatchingRoomQuery(matchingId);
  const { data: projects } = useProjectsQuery();
  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);

  const createChat = useChatStore((state) => state.createChat);

  useEffect(() => {
    if (participantsContainerRef.current) {
      const targetHeight = participantsContainerRef.current.offsetHeight;
      setHeight(targetHeight);
    }
  }, [participantsContainerRef.current?.offsetHeight]);

  useEffect(() => {
    if (matchingRoom) {
      const { id, chatId, matchingUsers } = matchingRoom;
      createChat({ id: chatId, matchingId: id, users: matchingUsers });
      setChatId(chatId);
    }
  }, [createChat, matchingRoom]);

  useEffect(() => {
    if (project) {
      const { id, chatId, members } = project;
      createChat({ id: chatId, projectId: id, users: members });
      setChatId(chatId);
    }
  }, [createChat, project]);

  return (
    <Container height={height}>
      <ChatParticipantsContainer ref={participantsContainerRef}>
        {chatId ? <ChatParticipants chatId={chatId} /> : <Loading />}
      </ChatParticipantsContainer>
      <ChatContainer>{chatId && <ChatBox chatId={chatId} />}</ChatContainer>
    </Container>
  );
};

const Container = styled.div<{ height?: number | null }>`
  position: relative;

  overflow: hidden;
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
