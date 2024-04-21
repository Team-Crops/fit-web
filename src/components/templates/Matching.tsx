'use client';

import { useState } from 'react';

import styled from '@emotion/styled';

import { MatchingStep } from '#/types/matching-step';
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
  const [step, setStep] = useState<MatchingStep>();
  return (
    <Container>
      <MatchingTitle />
    </Container>
  );
};
