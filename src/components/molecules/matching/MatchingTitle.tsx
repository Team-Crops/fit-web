import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';
import { MatchingStep } from '#/redux/features/matching/slice';
import { useAppSelector } from '#/redux/hooks';
import { ProgressBar } from '#molecules/ProgressBar';

const Container = styled.div`
  margin-bottom: 80px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
`;

export function MatchingTitle() {
  const nickname = useAppSelector((state) => state.user.me?.nickname);
  const matchingStep = useAppSelector((state) => state.matching.step);

  const currentStep = useMemo(() => matchingStep + 1, [matchingStep]);
  const totalStep = useMemo(() => Object.values(MatchingStep).length / 2, []);
  const titleText = useMemo(
    () =>
      [
        <Txt key={0} size="typo1" weight="bold">
          잠깐, {nickname} 님이 설정한 포지션과 기술/툴이 맞나요?
        </Txt>,
        <Txt key={1} size="typo1" weight="bold">
          {nickname} 님을 위한 매칭이 시작되었어요!
        </Txt>,
        <div key={2} style={{ display: 'flex', gap: '0.5em' }}>
          <Txt size="typo1" weight="bold">
            매칭이 완료되어
          </Txt>
          <Txt size="typo1" weight="bold" color="#ff706c">
            대기방이 생성되었어요
          </Txt>
        </div>,
      ][matchingStep],
    [matchingStep, nickname]
  );
  const tooltipText = useMemo(
    () => ['포지션 확인', '매칭 대기', '매칭 완료'][matchingStep],
    [matchingStep]
  );

  return (
    <Container>
      {titleText}
      <div style={{ height: '10px' }} />
      <Txt size="typo5" weight="regular" color="#9E9E9E">
        마이페이지에서 포지션과 사용가능한 기술/툴을 변경할 수 있습니다.
      </Txt>
      <div style={{ height: '35px' }} />
      <StyledProgressBar
        current={currentStep}
        total={totalStep}
        tooltipGap="10px"
        tooltipText={tooltipText}
      />
    </Container>
  );
}
