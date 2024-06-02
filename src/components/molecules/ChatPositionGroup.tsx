import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';
import { ChatUser, Position } from '#/types';
import { ChatParticipant } from './ChatParticipant';

interface ChatPositionGroupProps {
  name: Position['displayName'];
  participants: ChatUser[];
}

export const ChatPositionGroup = ({ name, participants }: ChatPositionGroupProps) => {
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
          />
        ))}
        {Array.from({ length: 2 - participants.length }).map((_, index) => (
          <ChatParticipant key={index} isEmpty imageUrl={null} nickname={null} />
        ))}
      </UserContainer>
    </Container>
  );
};

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
