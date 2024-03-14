'use client';

import { useMemo } from 'react';

import styled from '@emotion/styled';

import { MatchingStep } from '#/redux/features/matching/slice';
import { useAppSelector } from '#/redux/hooks';
import { ProgressBar } from '#molecules/ProgressBar';

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
`;

export function MatchingProgressBar() {
  const matchingStep = useAppSelector((state) => state.matching.step);

  const currentStep = useMemo(() => matchingStep + 1, [matchingStep]);
  const totalStep = useMemo(() => Object.values(MatchingStep).length / 2, []);
  const tooltipText = useMemo(
    () => ['포지션 확인', '매칭 대기', '매칭 완료'][matchingStep],
    [matchingStep]
  );

  return (
    <>
      <StyledProgressBar
        current={currentStep}
        total={totalStep}
        tooltipGap="10px"
        tooltipText={tooltipText}
      />
    </>
  );
}
