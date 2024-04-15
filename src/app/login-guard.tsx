'use client';

import { useEffect } from 'react';

import { getMe } from '#/actions/user';
import { SignIn } from '#/components/templates/SignIn';
import { SignUp } from '#/components/templates/SignUp';
import { useAuthStore } from '#/stores/auth';
import { useSignInStore } from '#/stores/sign-in';
import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { User } from '#/types/user';

interface LoginGuardProps {
  children: React.ReactNode;
}

export const LoginGuard = ({ children }: LoginGuardProps) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isPopupOpened = useSignInStore((state) => state.isPopupOpened);
  const openPopup = useSignInStore((state) => state.openPopup);
  const setSignUpStep = useSignUpStore((state) => state.setStep);

  useEffect(() => {
    async function loadUser() {
      const me = await getMe();
      setUser(me);

      if (me) {
        const step = checkSignUpStep(me);
        if (step !== SignUpStep.Complete) {
          openPopup();
        }
        setSignUpStep(step);
      } else {
        setSignUpStep(null);
      }
    }
    loadUser();
  }, [openPopup, setSignUpStep, setUser]);

  return (
    <>
      {children}
      {isPopupOpened && user && <SignUp />}
      {isPopupOpened && !user && <SignIn />}
    </>
  );
};

function checkSignUpStep(user: User): SignUpStep {
  if (!user.nickname) {
    return SignUpStep.ProfileCreation;
  } else if (!user.positionId) {
    return SignUpStep.PositionSelection;
  } else if (!user.username || !user.email || !user.backgroundText || !user.backgroundStatus) {
    return SignUpStep.ProfileDetailsSubmission;
  } else if (!user.projectCount || !user.regionId || !user.activityHour) {
    return SignUpStep.TimeAvailabilitySubmission;
  } else if (!user.skillIdList?.length) {
    return SignUpStep.ToolAvailabilitySubmission;
  }

  return SignUpStep.Complete;
}
