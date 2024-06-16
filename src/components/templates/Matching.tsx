'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { useMatchingQuery } from '#/hooks/use-matching';
import { useMatchingRoomQuery } from '#/hooks/use-matching-room';
import { ApiError, MatchingStatus } from '#/types';
import { MatchingTitle } from '#molecules/MatchingTitle';
import { MatchingChatRoom } from '#organisms/MatchingChatRoom';
import { MatchingRegister } from '#organisms/MatchingRegister';
import { MatchingWaiting } from '#organisms/MatchingWaiting';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 100px - 393px);
  margin: 0 auto;
  padding: 35px 0;
`;

export const Matching = () => {
  const [status, setStatus] = useState<MatchingStatus>(MatchingStatus.REGISTER);

  const { data: matching, error, isLoading } = useMatchingQuery();
  const { data: matchingRoom } = useMatchingRoomQuery(matching?.id);

  useEffect(() => {
    if (matching) {
      setStatus(matching.status);
    } else if (error && error.code === ApiError.MATCHING_NOT_FOUND_CODE) {
      setStatus(MatchingStatus.REGISTER);
    }
  }, [matching, error]);

  return (
    <Container>
      <MatchingTitle status={status} />
      {isLoading ? (
        <Loading />
      ) : status === MatchingStatus.REGISTER ? (
        <MatchingRegister />
      ) : status === MatchingStatus.WAITING ? (
        <MatchingWaiting />
      ) : matchingRoom ? (
        <MatchingChatRoom matchingId={matchingRoom.id} />
      ) : null}
    </Container>
  );
};
