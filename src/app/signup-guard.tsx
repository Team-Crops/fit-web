'use client';

import { useEffect, useMemo, useState } from 'react';

import { Backdrop } from '#/components/atoms';
import { SignUpCompletePopup } from '#/components/organisms/SignUpCompletePopup';
import { SignUpProfileCreationPopup } from '#/components/organisms/SignUpProfileCreationPopup';
import { SignUpProfileUpdatePopup } from '#/components/organisms/SignUpProfileUpdatePopup';
import { SignUpTermsPopup } from '#/components/organisms/SignUpTermsPopup';
import { usePolicyAgreesQuery } from '#/hooks/use-policy-agrees';
import { useMeQuery } from '#/hooks/use-user';
import { SignUpStep } from '#/types';
import { checkSignUpStep } from '#/utilities/check-sign-up-step';

export const SignupGuard = () => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [step, setStep] = useState<SignUpStep | null>(null);

  const setNextStep = () => setStep((step) => step && step + 1);
  const setPrevStep = () => setStep((step) => step && step - 1);

  const { data: me } = useMeQuery();
  const { data: policyAgreed } = usePolicyAgreesQuery();

  useEffect(() => {
    if (me && policyAgreed) {
      setStep(checkSignUpStep(me, policyAgreed));
    }
  }, [me, policyAgreed]);

  useEffect(() => {
    if (me?.id && step && step !== SignUpStep.COMPLETE) {
      setIsPopupOpened(true);
    }
  }, [step, me?.id]);

  const popupComponent = useMemo(() => {
    switch (step) {
      case SignUpStep.TERMS_AGREEMENT:
        return <SignUpTermsPopup />;
      case SignUpStep.PROFILE_CREATION:
        return <SignUpProfileCreationPopup onSuccess={() => setNextStep()} />;
      case SignUpStep.POSITION_SELECTION:
      case SignUpStep.PROFILE_DETAILS_SUBMISSION:
      case SignUpStep.TIME_AVAILABILITY_SUBMISSION:
      case SignUpStep.TOOL_AVAILABILITY_SUBMISSION:
        return (
          <SignUpProfileUpdatePopup
            step={step}
            onSuccess={() => setNextStep()}
            onCancel={() => setPrevStep()}
          />
        );
      case SignUpStep.COMPLETE:
        return <SignUpCompletePopup onCancel={() => setIsPopupOpened(false)} />;
      default:
        return null;
    }
  }, [step]);

  return isPopupOpened && popupComponent ? <Backdrop>{popupComponent}</Backdrop> : null;
};
