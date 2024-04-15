import styled from '@emotion/styled';

import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { PositionSelection } from './sign-up/PositionSelection';
import { ProfileDetailsSubmission } from './sign-up/ProfileDetailsSubmission';
import { TimeAvailabilitySubmission } from './sign-up/TimeAvailabilitySubmission';
import { ToolAvailabilitySubmission } from './sign-up/ToolAvailabilitySubmission';
import { SignUpProfileUpdateHeader } from '../molecules/SignUpProfileUpdateHeader';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: min(830px, 100%);
  height: 680px;

  background: linear-gradient(180deg, #fff 0%, #fff2f1 91.5%, #ffeae9 100%);
  border-radius: 15px;
`;

export const SignUpProfileUpdatePopup = () => {
  const step = useSignUpStore((store) => store.step);
  return (
    <Container>
      <SignUpProfileUpdateHeader />
      {step === SignUpStep.PositionSelection && <PositionSelection />}
      {step === SignUpStep.ProfileDetailsSubmission && <ProfileDetailsSubmission />}
      {step === SignUpStep.TimeAvailabilitySubmission && <TimeAvailabilitySubmission />}
      {step === SignUpStep.ToolAvailabilitySubmission && <ToolAvailabilitySubmission />}
    </Container>
  );
};
