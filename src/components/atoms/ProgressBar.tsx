import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 15px;

  background-color: #ffeae9;
`;

const Bar = styled.div<{ value: number }>`
  width: ${({ value }) => `${value}%`};
  height: 100%;

  border-radius: 0 10px 10px 0;
  background-color: #ff706c;
`;

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const ProgressBar = ({ value, ...props }: ProgressBarProps) => {
  return (
    <Container {...props}>
      <Bar value={value} />
    </Container>
  );
};
