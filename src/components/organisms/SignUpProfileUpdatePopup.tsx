import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { SignUpStep, Me } from '#/types';
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
  gap: 32px;
  align-items: center;

  width: 100%;
  max-width: 830px;
  max-height: 100vh;
  margin: 0 4px;

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
  const [modifiedMe, setModifiedMe] = useState<Me | null>(null);

  const userModifyHandler = (updated: Partial<Me>) =>
    setModifiedMe((me) => me && { ...me, ...updated });

  const { data: me, mutate: mutateCachedMe } = useMeQuery();
  const { trigger: mutateUser, isMutating } = useMeMutation();

  const onNextClick = useMemo(
    () => async () => {
      if (modifiedMe) {
        mutateCachedMe(await mutateUser({ ...modifiedMe }));
        onSuccess();
      }
    },
    [modifiedMe, mutateCachedMe, mutateUser, onSuccess]
  );

  const popupComponent = useMemo(() => {
    if (modifiedMe) {
      switch (step) {
        case SignUpStep.POSITION_SELECTION:
          return <PositionSelection user={modifiedMe} onUserModified={userModifyHandler} />;
        case SignUpStep.PROFILE_DETAILS_SUBMISSION:
          return <ProfileDetailsSubmission user={modifiedMe} onUserModified={userModifyHandler} />;
        case SignUpStep.TIME_AVAILABILITY_SUBMISSION:
          return (
            <TimeAvailabilitySubmission user={modifiedMe} onUserModified={userModifyHandler} />
          );
        case SignUpStep.TOOL_AVAILABILITY_SUBMISSION:
          return (
            <ToolAvailabilitySubmission user={modifiedMe} onUserModified={userModifyHandler} />
          );
      }
    } else {
      return null;
    }
  }, [modifiedMe, step]);

  useEffect(() => {
    if (me) {
      setModifiedMe(me);
    }
  }, [me]);

  useEffect(() => {
    if (modifiedMe) {
      setCanProceed(checkSignUpStep(modifiedMe) > step);
    }
  }, [modifiedMe, step]);

  return (
    <Container>
      <SignUpProfileUpdateHeader
        step={step}
        onPrevClick={onCancel}
        onNextClick={onNextClick}
        canProceed={canProceed && !isMutating}
      />
      {popupComponent}
      <div />
    </Container>
  );
};
