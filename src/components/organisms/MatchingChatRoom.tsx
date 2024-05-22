import styled from '@emotion/styled';

import { Button } from '#/components/atoms';
import { ChatRoom } from '#/components/organisms/ChatRoom';
import { useMatchingRoomReadyMutation } from '#/hooks/use-matching-room';
import { MatchingRoom } from '#/types';

interface MatchingChatRoomProps {
  matchingId: MatchingRoom['id'];
}

export const MatchingChatRoom = ({ matchingId }: MatchingChatRoomProps) => {
  const { trigger: readyMatching } = useMatchingRoomReadyMutation(matchingId);
  return (
    <Container>
      <ChatRoom matchingId={matchingId} />
      <ButtonContainer>
        <Button variant="round" height="70" color="secondary">
          대기방에서 나가기
        </Button>
        <Button variant="round" height="70" color="primary" onClick={() => readyMatching()}>
          프로젝트 시작하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;
