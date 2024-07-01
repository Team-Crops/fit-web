import styled from '@emotion/styled';

import { mutate } from 'swr';

import {
  MatchingChatPositionGroup,
  ProjectChatPositionGroup,
} from '#/components/molecules/ChatPositionGroup';
import { MatchingChatHeader } from '#/components/molecules/MatchingChatHeader';
import { ProjectChatHeader } from '#/components/molecules/ProjectChatHeader';
import {
  MATCHING_ROOM_QUERY_KEY,
  useChatUsers,
  useMatchingRoomForceOutMutation,
  useMeQuery,
  usePositionsQuery,
  useReportUserMutator,
} from '#/hooks';
import type { Matching, Project } from '#/types';

interface ChatParticipantsProps {
  matchingId?: Matching['id'];
  projectId?: Project['id'];

  onClickHeader?: React.MouseEventHandler<HTMLDivElement>;
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({
  matchingId,
  projectId,
  onClickHeader,
}) => {
  const { data: me } = useMeQuery();
  const { data: positions } = usePositionsQuery();
  const { trigger: kickUser } = useMatchingRoomForceOutMutation(matchingId ?? undefined);
  const { trigger: reportUser } = useReportUserMutator(projectId);

  const participants = useChatUsers({ projectId, matchingId });

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
              participants.some((p) => p.id === me?.id && p.isHost)
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
