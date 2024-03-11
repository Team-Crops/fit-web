import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 15px;

  border-radius: 100px;
  background-color: #ffeae9;
`;

const Bar = styled.div<{ value: number }>`
  width: ${({ value }) => `${value}%`};
  height: 100%;

  border-radius: 100px;
  background-color: #ff706c;
`;

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total, ...props }: ProgressBarProps) => {
  return (
    <Container {...props}>
      <Bar value={(100 / total) * current} />
    </Container>
  );
};
