import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { useShallow } from 'zustand/react/shallow';

import { useUserMutation } from '#/hooks/use-user';
import { useAuthStore } from '#/stores/auth';
import { User, SignUpStep } from '#/types';
import { checkSignUpStep } from '#/utilities';
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

interface SignUpProfileUpdatePopupProps {
  step: SignUpStep;
  onSuccess: () => void;
  onCancel: () => void;
}

export const SignUpProfileUpdatePopup: React.FC<SignUpProfileUpdatePopupProps> = ({
  step,
  onSuccess,
  onCancel,
}) => {
  const [canProceed, setCanProceed] = useState(false);
  const [modifiedUser, setModifiedUser] = useState<User | null>(null);

  const userModifyHandler = (updated: Partial<User>) =>
    setModifiedUser((user) => user && { ...user, ...updated });

  const { user, setUser } = useAuthStore(
    useShallow(({ user, setUser }) => ({
      user,
      setUser,
    }))
  );

  const { trigger: mutateUser, isMutating } = useUserMutation();

  const onNextClick = useMemo(
    () => async () => {
      if (modifiedUser) {
        const mutated = await mutateUser({ ...modifiedUser });
        setUser(mutated);
        onSuccess();
      }
    },
    [modifiedUser, mutateUser, onSuccess, setUser]
  );

  const popupComponent = useMemo(() => {
    if (modifiedUser) {
      switch (step) {
        case SignUpStep.POSITION_SELECTION:
          return <PositionSelection user={modifiedUser} onUserModified={userModifyHandler} />;
        case SignUpStep.PROFILE_DETAILS_SUBMISSION:
          return (
            <ProfileDetailsSubmission user={modifiedUser} onUserModified={userModifyHandler} />
          );
        case SignUpStep.TIME_AVAILABILITY_SUBMISSION:
          return (
            <TimeAvailabilitySubmission user={modifiedUser} onUserModified={userModifyHandler} />
          );
        case SignUpStep.TOOL_AVAILABILITY_SUBMISSION:
          return (
            <ToolAvailabilitySubmission user={modifiedUser} onUserModified={userModifyHandler} />
          );
      }
    } else {
      return null;
    }
  }, [modifiedUser, step]);

  useEffect(() => {
    if (user) {
      setModifiedUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (modifiedUser) {
      setCanProceed(checkSignUpStep(modifiedUser, true) > step);
    }
  }, [modifiedUser, step]);

  return (
    <Container>
      <SignUpProfileUpdateHeader
        step={step}
        onPrevClick={onCancel}
        onNextClick={onNextClick}
        canProceed={canProceed && !isMutating}
      />
      {popupComponent}
    </Container>
  );
};
