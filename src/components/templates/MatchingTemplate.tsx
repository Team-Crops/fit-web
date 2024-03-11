import styled from '@emotion/styled';

import { Button } from '#atoms/Button';
import { MatchingProgressBar } from '#molecules/matching/MatchingProgressBar';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';
import { MatchingProfile } from '#organisms/matching/MatchingProfile';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 100px);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export function MatchingTemplate() {
  return (
    <Container>
      <MatchingTitle />
      <div style={{ height: '35px' }} />
      <MatchingProgressBar />
      <MatchingProfile />
      <ButtonsContainer>
        <Button variant="round" height="70" color="secondary">
          수정하기
        </Button>
        <Button variant="round" height="70" color="primary">
          확인
        </Button>
      </ButtonsContainer>
    </Container>
  );
}
