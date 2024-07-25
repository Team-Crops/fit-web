import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { FitLogo } from '.';

export const Loading = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <Container ref={ref} {...props}>
      <Spinner>
        <FitLogo variant="symbol" />
      </Spinner>
    </Container>
  );
});

Loading.displayName = 'Loading';

const Container = styled.div`
  display: flex;
  justify-content: center;

  &[hidden] {
    display: none;
  }
`;

const Spinner = styled.div`
  width: fit-content;
  animation: spin-elastic-out 2s infinite;
`;
