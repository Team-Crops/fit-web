import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';
import { useMeQuery } from '#/hooks';
import type { ReportUserMutationArg } from '#/hooks/use-projects';
import { ChatUser, Position } from '#/types';
import { ChatParticipant } from './ChatParticipant';

interface ChatPositionGroupProps {
  name: Position['displayName'];
  participants: ChatUser[];
  onKickUser?: (userId: ChatUser['id']) => void;
  onReportUser?: (args: ReportUserMutationArg) => Promise<void>;
}

const ChatPositionGroup = ({
  name,
  participants,
  onKickUser,
  onReportUser,
}: ChatPositionGroupProps) => {
  const { data: me } = useMeQuery();
  return (
    <Container>
      <NameContainer>
        <Txt size="typo5" weight="medium">
          {name}
        </Txt>
      </NameContainer>
      <UserContainer>
        {participants.map((participant) => (
          <ChatParticipant
            key={participant.id}
            imageUrl={participant.profileImageUrl}
            nickname={participant.nickname}
            userId={participant.id}
            isHost={participant.isHost}
            isReady={participant.isReady}
            isReportable={participant.isReportable}
            onKickUser={
              onKickUser && participant.id !== me?.id ? () => onKickUser(participant.id) : undefined
            }
            onReportUser={
              onReportUser
                ? (args) => onReportUser({ ...args, targetUserId: participant.id })
                : undefined
            }
          />
        ))}
        {Array.from({ length: 2 - participants.length }).map((_, index) => (
          <ChatParticipant key={`empty-${index}`} isEmpty imageUrl={null} nickname={null} />
        ))}
      </UserContainer>
    </Container>
  );
};

export const MatchingChatPositionGroup = (props: Omit<ChatPositionGroupProps, 'onReportUser'>) =>
  ChatPositionGroup(props);

export const ProjectChatPositionGroup = (props: Omit<ChatPositionGroupProps, 'onKickUser'>) =>
  ChatPositionGroup(props);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;

  height: fit-content;
  padding: 12px 24px;

  background-color: #ffeae9;
  border-radius: 4px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
`;
