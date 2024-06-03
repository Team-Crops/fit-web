import styled from '@emotion/styled';

import { mutate } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import {
  MatchingChatPositionGroup,
  ProjectChatPositionGroup,
} from '#/components/molecules/ChatPositionGroup';
import { MatchingChatHeader } from '#/components/molecules/MatchingChatHeader';
import { ProjectChatHeader } from '#/components/molecules/ProjectChatHeader';
import {
  MATCHING_ROOM_QUERY_KEY,
  useMatchingRoomForceOutMutation,
} from '#/hooks/use-matching-room';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useReportUserMutator } from '#/hooks/use-projects';
import { useMeQuery } from '#/hooks/use-user';
import { useChatStore } from '#/stores';
import type { Chat } from '#/types';

interface ChatParticipantsProps {
  chatId: Chat['id'];

  onClickHeader?: React.MouseEventHandler<HTMLDivElement>;
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({ chatId, onClickHeader }) => {
  const { participants, projectId, matchingId } = useChatStore(
    useShallow(({ chats }) => ({
      participants: chats[chatId].users,
      projectId: chats[chatId].projectId,
      matchingId: chats[chatId].matchingId,
    }))
  );

  const { data: me } = useMeQuery();
  const { data: positions } = usePositionsQuery();
  const { trigger: kickUser } = useMatchingRoomForceOutMutation(matchingId ?? undefined);
  const { trigger: reportUser } = useReportUserMutator(projectId);

  return (
    <Container>
      <HeaderContainer onClick={onClickHeader}>
        {projectId ? (
          <ProjectChatHeader projectId={projectId} />
        ) : matchingId ? (
          <MatchingChatHeader />
        ) : null}
      </HeaderContainer>
      {positions?.map((position) =>
        projectId ? (
          <ProjectChatPositionGroup
            key={position.id}
            name={position.displayName}
            participants={participants.filter((p) => p.positionId === position.id) ?? []}
            onReportUser={reportUser}
          />
        ) : matchingId ? (
          <MatchingChatPositionGroup
            key={position.id}
            name={position.displayName}
            participants={participants.filter((p) => p.positionId === position.id) ?? []}
            onKickUser={
              participants.some((p) => p.isHost && p.id === me?.id)
                ? async (userId) => {
                    await kickUser({ userId });
                    mutate(MATCHING_ROOM_QUERY_KEY(matchingId));
                  }
                : undefined
            }
          />
        ) : null
      )}
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
