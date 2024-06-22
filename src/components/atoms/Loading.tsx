import { forwardRef } from 'react';

import styled from '@emotion/styled';

import { FitLogo } from '.';

export const Loading = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <Container ref={ref}>
      <FitLogo variant="symbol" />
    </Container>
  );
});

Loading.displayName = 'Loading';

const Container = styled.div`
  display: inline-block;
  animation: spin-elastic-out 2s infinite;
`;
