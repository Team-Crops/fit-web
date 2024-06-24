import { forwardRef } from 'react';

import styled from '@emotion/styled';

import { FitLogo } from '.';

export const Loading = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <Container ref={ref}>
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
`;

const Spinner = styled.div`
  width: fit-content;
  animation: spin-elastic-out 2s infinite;
`;
