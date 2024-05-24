import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

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
  const router = useRouter();
  const userId = useAuthStore((store) => store.user?.id);

  const { data: matching } = useMatching();
  const { data: matchingRoom } = useMatchingRoom(matching?.id);

  const isReady = useMemo(
    () => matchingRoom?.matchingUsers.find((u) => u.id === userId)?.isReady,
    [matchingRoom?.matchingUsers, userId]
  );

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
          onClick={() => {
            completeMatching().then(() => {
              router.push('/project');
            });
          }}
        >
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
