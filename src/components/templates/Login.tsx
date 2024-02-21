import React, { useCallback } from 'react';

import styled from '@emotion/styled';

import { AuthStep } from '#/redux/features/auth/slice';
import { useAppSelector } from '#/redux/hooks';
import {
  LoginPopup,
  PoliciesPopup,
  UserInfoPopup,
  PositionInfoPopup,
  PersonalInfoPopup,
  ActivityInfoPopup,
  SkillInfoPopup,
  CompletePopup,
} from '#organisms/login';

export const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background: rgba(66, 66, 66, 0.4);

  z-index: 100;
`;

interface LoginProps {
  onCancel: () => void;
}

export const Login: React.FC<LoginProps> = ({ onCancel }: LoginProps) => {
  const step = useAppSelector((state) => state.auth.step);

  const LoginStepComponent: Record<AuthStep, React.ReactElement> = {
    [AuthStep.Entrance]: <LoginPopup onCancel={onCancel} />,
    [AuthStep.Policies]: <PoliciesPopup />,
    [AuthStep.UserInfo]: <UserInfoPopup />,
    [AuthStep.PositionInfo]: <PositionInfoPopup />,
    [AuthStep.PersonalInfo]: <PersonalInfoPopup />,
    [AuthStep.ActivityInfo]: <ActivityInfoPopup />,
    [AuthStep.SkillInfo]: <SkillInfoPopup />,
    [AuthStep.Complete]: <CompletePopup onCancel={onCancel} />,
  };

  const handleBackdropClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      const isCancelable =
        step === null || step === AuthStep.Entrance || step === AuthStep.Complete;
      if (e.target === e.currentTarget && isCancelable) {
        onCancel();
      }
    },
    [onCancel, step]
  );

  return (
    <Backdrop onClick={handleBackdropClick}>
      {LoginStepComponent[step ?? AuthStep.Entrance]}
    </Backdrop>
  );
};
