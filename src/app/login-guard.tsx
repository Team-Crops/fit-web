'use client';

import { useEffect, useMemo, useState } from 'react';

import { Backdrop } from '#/components/atoms';
import { SignUpCompletePopup } from '#/components/organisms/SignUpCompletePopup';
import { SignUpProfileCreationPopup } from '#/components/organisms/SignUpProfileCreationPopup';
import { SignUpProfileUpdatePopup } from '#/components/organisms/SignUpProfileUpdatePopup';
import { SignUpTermsPopup } from '#/components/organisms/SignUpTermsPopup';
import { useAuthStore } from '#/stores/auth';
import { PolicyAgreement, policies } from '#/types/policy';
import { SignUpStep } from '#/types/sign-up-step';
import { User } from '#/types/user';
import { checkSignUpStep } from '#/utilities/check-sign-up-step';
import { fitFetcher } from '#/utilities/fetch';
import { getTokens } from '#/utilities/session';

interface LoginGuardProps {
  children: React.ReactNode;
}

export const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [step, setStep] = useState<SignUpStep | null>(null);

  const setNextStep = () => setStep((step) => step && step + 1);
  const setPrevStep = () => setStep((step) => step && step - 1);

  const user = useAuthStore((store) => store.user);
  const setAuth = useAuthStore((store) => store.set);
  const policyAgreed = useAuthStore((store) => store.policyAgreed);

  useEffect(() => {
    async function fetchAuth() {
      const tokens = getTokens();
      if (tokens && !user?.id) {
        const user = await fetchUser();
        const policyAgreed = await fetchPolicyAgreed();
        setAuth({ user, policyAgreed });
      }
    }
    fetchAuth();
  }, [user?.id, setAuth]);

  useEffect(() => {
    if (user && policyAgreed !== null) {
      setStep(checkSignUpStep(user, policyAgreed));
    }
  }, [user, policyAgreed]);

  useEffect(() => {
    if (user?.id && step !== SignUpStep.COMPLETE) {
      setIsPopupOpened(true);
    }
  }, [step, user?.id]);

  const popupComponent = useMemo(() => {
    switch (step) {
      case SignUpStep.TERMS_AGREEMENT:
        return <SignUpTermsPopup onSuccess={() => setNextStep()} />;
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

  return (
    <>
      {children}
      {isPopupOpened && popupComponent && <Backdrop>{popupComponent}</Backdrop>}
    </>
  );
};

async function fetchUser(): Promise<User> {
  return await fitFetcher<User>('/v1/user');
}

async function fetchPolicyAgreed(): Promise<boolean> {
  const termAgreements = await fitFetcher<{ policyAgreementList: PolicyAgreement[] }>(
    '/v1/user/policy-agreement'
  );
  return Object.values(policies).every(({ type }) =>
    termAgreements.policyAgreementList.some(
      (agreement) => agreement.policyType === type && agreement.isAgree
    )
  );
}
