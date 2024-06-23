import { forwardRef } from 'react';

import styled from '@emotion/styled';

import { FitLogo } from '.';

export const Loading = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <Container ref={ref}>
      <FlexBlock>
        <FitLogo variant="symbol" />
      </FlexBlock>
    </Container>
  );
});

Loading.displayName = 'Loading';

const FlexBlock = styled.div`
  display: flex;
  width: fit-content;
  animation: spin-elastic-out 2s infinite;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
