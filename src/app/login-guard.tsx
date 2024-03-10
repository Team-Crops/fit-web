'use client';

import { useEffect } from 'react';

import _ from 'lodash';

import { Login } from '#/components/templates/Login';
import { type PolicyType, policies } from '#/entities/policy';
import { AuthStep, deleteAuth, updateAuth } from '#/redux/features/auth/slice';
import { useLazyMeQuery, useLazyMyAgreementsQuery } from '#/redux/features/user/api';
import { setMe } from '#/redux/features/user/slice';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';

interface LoginGuardProps {
  children: React.ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const dispatch = useAppDispatch();

  const showLoginPopup = useAppSelector((state) => state.auth.showLoginPopup);

  const [queryMe, { data: me, isSuccess: queryMeSuccess, isError: queryMeError }] =
    useLazyMeQuery();
  const [queryAgreements, { data: agreements }] = useLazyMyAgreementsQuery();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(updateAuth({ accessToken, refreshToken }));
    queryMe();
    queryAgreements();
  }, [dispatch, queryAgreements, queryMe]);

  useEffect(() => {
    if (queryMeSuccess && me && agreements) {
      let step: AuthStep;

      if (
        _.some(
          policies,
          (policy, policyName) => policy.required && !agreements[policyName as PolicyType]
        )
      ) {
        step = AuthStep.Policies;
      } else if (!me.nickname) {
        step = AuthStep.UserInfo;
      } else if (!me.positionId) {
        step = AuthStep.PositionInfo;
      } else if (!me.username || !me.email || !me.backgroundStatus || !me.backgroundText) {
        step = AuthStep.PersonalInfo;
      } else if (!me.projectCount || !me.regionId || !me.activityHour) {
        step = AuthStep.ActivityInfo;
      } else if (!me.skillIdList) {
        step = AuthStep.SkillInfo;
      } else {
        step = AuthStep.Complete;
      }

      dispatch(setMe(me));
      dispatch(updateAuth({ step, showLoginPopup: me.status === 'INCOMPLETE' }));
    }
  }, [agreements, dispatch, me, queryMeSuccess]);

  useEffect(() => {
    if (queryMeError) {
      dispatch(deleteAuth());
    }
  }, [dispatch, queryMeError]);

  return (
    <>
      {children}
      {showLoginPopup && <Login />}
    </>
  );
}
