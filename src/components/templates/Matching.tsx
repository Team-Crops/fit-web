'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { MATCHING_NOT_FOUND_CODE, useMatchingQuery } from '#/hooks/use-matching';
import { MatchingStatus } from '#/types';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 100px - 393px);
  padding: 35px 0;
`;

export const Matching = () => {
  const [status, setStatus] = useState<MatchingStatus>(MatchingStatus.REGISTER);

  const { data: matching, error } = useMatchingQuery();

  useEffect(() => {
    if (matching) {
      setStatus(matching.status);
    } else if (error && error.code === MATCHING_NOT_FOUND_CODE) {
      setStatus(MatchingStatus.REGISTER);
    }
  }, [matching, error]);

  return (
    <Container>
      <MatchingTitle status={status} />
    </Container>
  );
};
