import styled from '@emotion/styled';

import { useShallow } from 'zustand/react/shallow';

import { ChatPositionGroup } from '#/components/molecules/ChatPositionGroup';
import { MatchingChatHeader } from '#/components/molecules/MatchingChatHeader';
import { ProjectChatHeader } from '#/components/molecules/ProjectChatHeader';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useChatStore } from '#/stores';
import type { Chat, ChatUser, Project } from '#/types';

interface ChatParticipantsProps {
  chatId: Chat['id'];

  onClickHeader?: React.MouseEventHandler<HTMLDivElement>;
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({ chatId, onClickHeader }) => {
  const { data: positions } = usePositionsQuery();

  const { participants, projectId } = useChatStore(
    useShallow(({ chats }) => ({
      participants: chats[chatId].users,
      projectId: chats[chatId].projectId,
    }))
  );

  return (
    <Container>
      <HeaderContainer onClick={onClickHeader}>
        {projectId ? <ProjectChatHeader projectId={projectId} /> : <MatchingChatHeader />}
      </HeaderContainer>
      {positions?.map((position) => (
        <ChatPositionGroup
          key={position.id}
          name={position.displayName}
          participants={participants.filter((p) => p.positionId === position.id) ?? []}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 100%;
  height: fit-content;
`;

const HeaderContainer = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;
