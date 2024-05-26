import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms';
import { ChatRoom } from '#/components/organisms/ChatRoom';
import { useMatchingQuery } from '#/hooks/use-matching';
import {
  useMatchingRoomCancelMutation,
  useMatchingRoomQuery,
  useMatchingRoomReadyMutation,
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

  const isReady = useMemo(
    () => matchingRoom?.matchingUsers.find((u) => u.id === me?.id)?.isReady,
    [matchingRoom?.matchingUsers, me?.id]
  );

  const { trigger: readyMatching, isMutating: isMutatingReady } =
    useMatchingRoomReadyMutation(matchingId);
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
          disabled={isMutatingReady}
          onClick={() => readyMatching({ isReady: !isReady })}
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
