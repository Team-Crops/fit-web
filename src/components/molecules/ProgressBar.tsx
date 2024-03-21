import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Txt } from '../atoms/Text';

const Container = styled.div`
  width: 100%;
  height: 15px;
  background-color: #ffeae9;
  border-radius: 100px;
`;

const Bar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;

  background-color: #ff706c;
  border-radius: 100px;

  transition: width 0.3s;
`;

const TooltipContainer = styled.div<{ progress: number }>`
  position: relative;
  left: ${({ progress }) => `${progress}%`};
  transform: translateX(-50%);

  display: flex;
  gap: 4px;

  width: fit-content;
  padding: 9px 16px;

  color: #fff;

  background-color: #ffa7a5;
  border-radius: 100px;

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
