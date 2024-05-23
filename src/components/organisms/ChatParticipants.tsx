import styled from '@emotion/styled';

import { ChatPositionGroup } from '#/components/molecules/ChatPositionGroup';
import { MatchingChatHeader } from '#/components/molecules/MatchingChatHeader';
import { ProjectChatHeader } from '#/components/molecules/ProjectChatHeader';
import { usePositionsQuery } from '#/hooks/use-positions';
import type { ChatUser, Project } from '#/types';

interface ChatParticipantsProps {
  projectId?: Project['id'];
  participants: ChatUser[];

  onClickHeader?: React.MouseEventHandler<HTMLDivElement>;
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({
  projectId,
  participants,
  onClickHeader,
}) => {
  const { data: positions } = usePositionsQuery();

  return (
    <Container>
      <HeaderContainer onClick={onClickHeader}>
        {projectId ? <ProjectChatHeader projectId={projectId} /> : <MatchingChatHeader />}
      </HeaderContainer>
      {positions?.map((position) => (
        <ChatPositionGroup
          key={position.id}
          name={position.displayName}
          participants={participants.filter((p) => p.positionId === position.id)}
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
