import { type ReactElement } from 'react';

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
  width: 100vw;
  height: 100vh;
  background: rgba(66, 66, 66, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
`;

interface LoginProps {
  onCancel: () => void;
}

export const Login = ({ onCancel }: LoginProps) => {
  const step = useAppSelector((state) => state.auth.step);
  const LoginStepComponent: Record<AuthStep, ReactElement> = {
    [AuthStep.Entrance]: <LoginPopup onCancel={onCancel} />,
    [AuthStep.Policies]: <PoliciesPopup />,
    [AuthStep.UserInfo]: <UserInfoPopup />,
    [AuthStep.PositionInfo]: <PositionInfoPopup />,
    [AuthStep.PersonalInfo]: <PersonalInfoPopup />,
    [AuthStep.ActivityInfo]: <ActivityInfoPopup />,
    [AuthStep.SkillInfo]: <SkillInfoPopup />,
    [AuthStep.Complete]: <CompletePopup />,
  };

  return (
    <Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget && step == AuthStep.Entrance) {
          onCancel();
        }
      }}
    >
      {LoginStepComponent[step ?? 0]}
    </Backdrop>
  );
};
