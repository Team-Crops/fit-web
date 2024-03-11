import styled from '@emotion/styled';

import { MatchingProgressBar } from '#molecules/matching/MatchingProgressBar';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1200px;
`;

export function MatchingTemplate() {
  return (
    <Container>
      <MatchingTitle />
      <div style={{ height: '35px' }} />
      <MatchingProgressBar />
    </Container>
  );
}
