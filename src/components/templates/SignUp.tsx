'use client';

import { SignUpTermsPopup } from '#/components/organisms/SignUpTermsPopup';
import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { Backdrop } from '#atoms/Backdrop';
import { SignUpProfileCreationPopup } from '#organisms/SignUpProfileCreationPopup';
import { SignUpProfileUpdatePopup } from '#organisms/SignUpProfileUpdatePopup';
import { SignUpCompletePopup } from '../organisms/SignUpCompletePopup';

export const SignUp = () => {
  const step = useSignUpStore((state) => state.step);

  return (
    <Backdrop>
      {step === SignUpStep.TermsAgreement && <SignUpTermsPopup />}
      {step === SignUpStep.ProfileCreation && <SignUpProfileCreationPopup />}
      {step &&
        [
          SignUpStep.PositionSelection,
          SignUpStep.ProfileDetailsSubmission,
          SignUpStep.TimeAvailabilitySubmission,
          SignUpStep.ToolAvailabilitySubmission,
        ].includes(step) && <SignUpProfileUpdatePopup />}
      {step === SignUpStep.Complete && <SignUpCompletePopup />}
    </Backdrop>
  );
};
