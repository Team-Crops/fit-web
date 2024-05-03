import styled from '@emotion/styled';

import { MatchingChatHeader } from '#/components/molecules/MatchingChatHeader';
import { ProjectChatHeader } from '#/components/molecules/ProjectChatHeader';
import { MatchingRoom, Project } from '#/types';

interface ChatParticipantsProps {
  matchingId?: MatchingRoom['id'];
  projectId?: Project['id'];
}

export const ChatParticipants: React.FC<ChatParticipantsProps> = ({ matchingId, projectId }) => {
  return (
    <Container>
      {matchingId ? (
        <MatchingChatHeader />
      ) : projectId ? (
        <ProjectChatHeader projectId={projectId} />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;
