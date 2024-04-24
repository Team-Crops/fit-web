'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { MATCHING_NOT_FOUND_CODE, useMatchingQuery } from '#/hooks/use-matching';
import { MatchingStatus } from '#/types';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';
import { MatchingRegister } from '#organisms/MatchingRegister';
import { MatchingTalk } from '#organisms/MatchingTalk';
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

  const { data: matching, error } = useMatchingQuery();

  useEffect(() => {
    console.log('matching', matching);
    console.log('error', error);
    if (matching) {
      setStatus(matching.status);
    } else if (error && error.code === MATCHING_NOT_FOUND_CODE) {
      setStatus(MatchingStatus.REGISTER);
    }
  }, [matching, error]);

  return (
    <Container>
      <MatchingTitle status={status} />
      {status === MatchingStatus.REGISTER ? (
        <MatchingRegister />
      ) : status === MatchingStatus.WAITING ? (
        <MatchingWaiting />
      ) : (
        <MatchingTalk />
      )}
    </Container>
  );
};
