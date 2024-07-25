import styled from '@emotion/styled';

import { ChatRoom } from '#/components/organisms/ChatRoom';
import { MatchingRoom } from '#/types';
import { MatchingButtons } from '../molecules/MatchingButtons';

interface MatchingChatRoomProps {
  matchingId: MatchingRoom['id'];
}

export const MatchingChatRoom = ({ matchingId }: MatchingChatRoomProps) => {
  return (
    <Container>
      <ChatRoom matchingId={matchingId} />
      <MatchingButtons>
        <MatchingButtons.QuitButton matchingId={matchingId} />
        <MatchingButtons.ReadyButton matchingId={matchingId} />
      </MatchingButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;
