import styled from '@emotion/styled';

import { ProgressBar } from '#/components/atoms/ProgressBar';
import { Txt } from '#/components/atoms/Text';

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
`;

const TooltipContainer = styled.div`
  display: flex;
  gap: 4px;

  position: relative;
  width: fit-content;
  left: 33%;
  transform: translateX(-50%);

  border-radius: 100px;
  padding: 9px 16px;
  background-color: #ffa7a5;
  color: #ffffff;
`;

export function MatchingProgressBar() {
  return (
    <>
      <StyledProgressBar current={1} total={3} />
      <div style={{ height: '10px' }} />
      <TooltipContainer>
        <Txt size="typo6" weight="bold">
          1/3
        </Txt>
        <Txt size="typo6" weight="medium">
          포지션 확인
        </Txt>
      </TooltipContainer>
    </>
  );
}
