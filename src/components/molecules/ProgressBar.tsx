import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Txt } from '../atoms/Text';

const Container = styled.div`
  width: 100%;
  height: 15px;

  border-radius: 100px;
  background-color: #ffeae9;
`;

const Bar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;

  border-radius: 100px;
  background-color: #ff706c;

  transition: width 0.3s;
`;

const TooltipContainer = styled.div<{ progress: number }>`
  display: flex;
  gap: 4px;

  position: relative;
  width: fit-content;
  left: ${({ progress }) => `${progress}%`};
  transform: translateX(-50%);

  border-radius: 100px;
  padding: 9px 16px;
  background-color: #ffa7a5;
  color: #ffffff;

  transition: left 0.3s;
`;

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  tooltipText?: string;
  tooltipGap?: string;
}

export const ProgressBar = ({
  current,
  total,
  tooltipText,
  tooltipGap = '0px',
  ...props
}: ProgressBarProps) => {
  const progress = (current / total) * 100;
  return (
    <Container {...props}>
      <Bar progress={progress} />
      <div style={{ height: tooltipGap }} />
      {tooltipText && (
        <TooltipContainer progress={progress}>
          <Txt size="typo6" weight="bold">
            {current}/{total}
          </Txt>
          <Txt size="typo6" weight="medium">
            {tooltipText}
          </Txt>
        </TooltipContainer>
      )}
    </Container>
  );
};
