import styled from '@emotion/styled';

import { MatchingStep } from '#/redux/features/matching/slice';
import { useAppSelector } from '#/redux/hooks';
import { MatchingTitle } from '#molecules/matching/MatchingTitle';
import { MatchingProfile } from '#organisms/matching/MatchingProfile';
import { MatchingQueued } from '#organisms/matching/MatchingQueued';
import { MatchingTalk } from '#organisms/matching/MatchingTalk';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 100px - 393px); // 100px: Header, 393px: Footer
  padding: 35px 0;
`;

export function Matching() {
  const matchingStep = useAppSelector((state) => state.matching.step);
  return (
    <Container>
      <MatchingTitle />
      {matchingStep === MatchingStep.POSITION_CHECKING && <MatchingProfile />}
      {matchingStep === MatchingStep.QUEUING && <MatchingQueued />}
      {matchingStep === MatchingStep.MATCHED && <MatchingTalk />}
    </Container>
  );
}
