import { useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useAuthStore } from '#/stores/auth';
import { MatchingStatus } from '#/types';
import { ProgressBar } from '#molecules/ProgressBar';

const Container = styled.div`
  margin-bottom: 80px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
`;

interface MatchingTitleProps {
  status: MatchingStatus;
}

export const MatchingTitle = ({ status }: MatchingTitleProps) => {
  const nickname = useAuthStore((store) => store.user?.nickname);

  const step = useMemo(
    () => (status === MatchingStatus.REGISTER ? 0 : status === MatchingStatus.WAITING ? 1 : 2),
    [status]
  );

  const titleTexts = useMemo(
    () => [
      <>
        <Txt size="typo1" weight="bold" marginBottom={4}>
          잠깐, {nickname} 님이 설정한 포지션과 기술/툴이 맞나요?
        </Txt>
        <Txt size="typo5" weight="regular" color="#9E9E9E">
          마이페이지에서 포지션과 사용가능한 기술/툴을 변경할 수 있습니다.
        </Txt>
      </>,
      <>
        <Txt size="typo1" weight="bold" marginBottom={4}>
          {nickname} 님을 위한 매칭이 시작되었어요!
        </Txt>
        <Txt size="typo5" weight="regular" color="#9E9E9E">
          프로젝트의 최소인원이 충족되어 팀 매칭이 완료되면 대기방이 생성되어 이메일로 알려드릴게요.
          잠시만 기다려주세요!
        </Txt>
      </>,
      <>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          <Txt size="typo1" weight="bold" marginBottom={4}>
            매칭이 완료되어
          </Txt>
          <Txt size="typo1" weight="bold" color="#ff706c">
            대기방이 생성되었어요
          </Txt>
        </div>
        <Txt size="typo5" weight="regular" color="#9E9E9E">
          대기방에 있는 사람들과 채팅을 통해 프로젝트를 준비해보세요!
        </Txt>
      </>,
    ],
    [nickname]
  );

  const tooltipTexts = ['포지션 확인', '매칭 대기', '매칭 완료'];

  return (
    <Container>
      {titleTexts[step]}
      <div style={{ height: '32px' }} />
      <StyledProgressBar
        current={step + 1}
        total={3}
        tooltipGap="8px"
        tooltipText={tooltipTexts[step]}
      />
    </Container>
  );
};
