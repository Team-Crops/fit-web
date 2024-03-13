'use client';

import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useAppSelector } from '#/redux/hooks';
import { Backdrop } from '#atoms/Backdrop';
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

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const step = useAppSelector((state) => state.auth.step);

  const closePopup = useCallback(() => {
    dispatch(updateAuth({ showLoginPopup: false }));
  }, [dispatch]);

  const LoginStepComponent: Record<AuthStep, React.ReactElement> = {
    [AuthStep.Entrance]: <LoginPopup />,
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
        const isCancelable =
          step === null || step === AuthStep.Entrance || step === AuthStep.Complete;
        if (isCancelable && e.target === e.currentTarget) {
          closePopup();
        }
      }}
    >
      {LoginStepComponent[step ?? AuthStep.Entrance]}
    </Backdrop>
  );
};
