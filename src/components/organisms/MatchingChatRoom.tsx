import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms';
import { ChatRoom } from '#/components/organisms/ChatRoom';
import { useMatchingQuery } from '#/hooks/use-matching';
import {
  useMatchingRoomQuery,
  useMatchingRoomCompleteMutation,
  useMatchingRoomReadyMutation,
  useMatchingRoomQuitMutation,
} from '#/hooks/use-matching-room';
import { useMeQuery } from '#/hooks/use-user';
import { MatchingRoom } from '#/types';

interface MatchingChatRoomProps {
  matchingId: MatchingRoom['id'];
}

export const MatchingChatRoom = ({ matchingId }: MatchingChatRoomProps) => {
  const { data: matching } = useMatchingQuery();
  const { data: matchingRoom } = useMatchingRoomQuery(matching?.id);

  const { data: me } = useMeQuery();

  const { isReady, isHost } = useMemo(() => {
    const user = matchingRoom?.matchingUsers.find((u) => u.id === me?.id);
    return {
      isReady: user?.isReady,
      isHost: user?.isHost,
    };
  }, [matchingRoom?.matchingUsers, me?.id]);

  const { trigger: readyMatching, isMutating: isMutatingReady } =
    useMatchingRoomReadyMutation(matchingId);
  const { trigger: completeMatching, isMutating: isMutatingComplete } =
    useMatchingRoomCompleteMutation(matchingId);
  const { trigger: quitMatching, isMutating: isMutatingCancel } =
    useMatchingRoomQuitMutation(matchingId);

  return (
    <Container>
      <ChatRoom matchingId={matchingId} />
      <ButtonContainer>
        <Button
          variant="round"
          height="70"
          color="secondary"
          disabled={isMutatingCancel}
          onClick={() => quitMatching()}
        >
          대기방에서 나가기
        </Button>
        <Button
          variant="round"
          height="70"
          color="primary"
          disabled={isMutatingReady || isMutatingComplete}
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
