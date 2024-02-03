'use client';

import { use, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { NotFound } from '#/components/templates/NotFound';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useLazyMeQuery } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';

export const LoginCallback = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [trigger, { data: me, error }] = useLazyMeQuery();

  useEffect(() => {
    dispatch(updateAuth({ accessToken, refreshToken }));
    trigger();
  }, [trigger, dispatch, accessToken, refreshToken]);

  useEffect(() => {
    if (me) {
      let step: AuthStep;
      if (!me.profileImageUrl || !me.nickname) {
        step = AuthStep.UserInfo;
      } else if (!me.positionId) {
        step = AuthStep.PositionInfo;
      } else if (!me.username || !me.email) {
        step = AuthStep.PersonalInfo;
      } else if (!me.projectCount || !me.regionId || !me.activityHours) {
        step = AuthStep.ActivityInfo;
      } else if (me.skillIds.length === 0) {
        step = AuthStep.SkillInfo;
      } else {
        step = AuthStep.Complete;
      }

      dispatch(
        updateAuth({
          step,
          user: me,
          accessToken,
          refreshToken,
        })
      );

      router.push('/');
    }
  }, [me, dispatch, router, accessToken, refreshToken]);

  if (!accessToken || !refreshToken) {
    return <NotFound />;
  }
  if (error) {
    const queryError = error as FetchBaseQueryError;
    return <div>{queryError.status} Error occured</div>;
  }
  return <div>Loading</div>;
};
