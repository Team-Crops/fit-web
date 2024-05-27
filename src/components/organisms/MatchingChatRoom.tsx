import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms';
import { ChatRoom } from '#/components/organisms/ChatRoom';
import {
  useMatchingRoomCancelMutation,
  useMatchingRoomCompleteMutation,
  useMatchingRoomReadyMutation,
} from '#/hooks/use-matching-room';
import { useAuthStore, useMatching, useMatchingRoom } from '#/stores';
import { MatchingRoom } from '#/types';

interface MatchingChatRoomProps {
  matchingId: MatchingRoom['id'];
}

export const MatchingChatRoom = ({ matchingId }: MatchingChatRoomProps) => {
  const userId = useAuthStore((store) => store.user?.id);

  const { data: matching } = useMatching();
  const { data: matchingRoom } = useMatchingRoom(matching?.id);

  const { isReady, isHost } = useMemo(() => {
    const user = matchingRoom?.matchingUsers.find((u) => u.id === userId);
    return {
      isReady: user?.isReady,
      isHost: user?.isHost,
    };
  }, [matchingRoom?.matchingUsers, userId]);

  const { trigger: readyMatching } = useMatchingRoomReadyMutation(matchingId);
  const { trigger: completeMatching } = useMatchingRoomCompleteMutation(matchingId);
  const { trigger: cancelMatching } = useMatchingRoomCancelMutation(matchingId);

  return (
    <Container>
      <ChatRoom matchingId={matchingId} />
      <ButtonContainer>
        <Button variant="round" height="70" color="secondary" onClick={() => cancelMatching()}>
          대기방에서 나가기
        </Button>
        <Button
          variant="round"
          height="70"
          color="primary"
          onClick={() => (isHost ? completeMatching() : readyMatching({ isReady: !isReady }))}
        >
          프로젝트 {isHost ? '시작하기' : '준비하기'}
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
