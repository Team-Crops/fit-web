'use client';

import { useEffect, useMemo, useState } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { Backdrop } from '#/components/atoms';
import { SignUpCompletePopup } from '#/components/organisms/SignUpCompletePopup';
import { SignUpProfileCreationPopup } from '#/components/organisms/SignUpProfileCreationPopup';
import { SignUpProfileUpdatePopup } from '#/components/organisms/SignUpProfileUpdatePopup';
import { SignUpTermsPopup } from '#/components/organisms/SignUpTermsPopup';
import { policies } from '#/entities';
import { useAuthStore } from '#/stores/auth';
import { SignUpStep, PolicyAgreement, User } from '#/types';
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

  const {
    user,
    tokens,
    policyAgreed,
    set: setAuth,
  } = useAuthStore(
    useShallow(({ user, tokens, policyAgreed, set }) => ({ user, tokens, policyAgreed, set }))
  );

  useEffect(() => {
    async function fetchAuth() {
      if (tokens) {
        const user = await fetchUser();
        const policyAgreed = await fetchPolicyAgreed();
        setAuth({ user, tokens, policyAgreed });
      }
    }
    fetchAuth();
  }, [tokens, setAuth]);

  useEffect(() => {
    if (user && policyAgreed !== null) {
      setStep(checkSignUpStep(user, policyAgreed));
    }
  }, [user, policyAgreed]);

  useEffect(() => {
    if (user?.id && step && step !== SignUpStep.COMPLETE) {
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
