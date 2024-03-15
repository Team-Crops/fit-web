import styled from '@emotion/styled';

import { MatchingStep } from '#/redux/features/matching/slice';
import { useAppSelector } from '#/redux/hooks';
import { Button } from '#atoms/Button';
import { MatchingProgressBar } from '#molecules/matching/MatchingProgressBar';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';
import { MatchingProfile } from '#organisms/matching/MatchingProfile';
import { MatchingProgress } from '#organisms/matching/MatchingProgress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 100px - 393px); // 100px: Header, 393px: Footer
  padding: 35px 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export function MatchingTemplate() {
  const matchingStep = useAppSelector((state) => state.matching.step);
  return (
    <Container>
      <MatchingTitle />
      <div style={{ height: '35px' }} />
      <MatchingProgressBar />
      <div style={{ height: '35px' }} />
      {matchingStep === MatchingStep.POSITION_CHECKING && <MatchingProfile />}
      {matchingStep === MatchingStep.QUEUING && <MatchingProgress />}
      {matchingStep === MatchingStep.MATCHED && <div>Success</div>}
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
