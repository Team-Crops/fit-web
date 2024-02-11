'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { SocialPlatform } from '#/entities/socialPlatform';
import { useLazyAcquireTokenQuery } from '#/redux/features/auth/api';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useLazyMeQuery } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
import { Txt } from '#atoms/Text';

interface LoginCallbackProps {
  platform: SocialPlatform;
}

export const LoginCallback = ({ platform }: LoginCallbackProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [acquireToken, { data: tokens, error: acquireTokenError }] = useLazyAcquireTokenQuery();
  const [queryMe, { data: me, error: queryMeError }] = useLazyMeQuery();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  console.table({ code, platform });
  useEffect(() => {
    if (code) {
      acquireToken({ platform, code });
    } else {
      notFound();
    }
  }, [acquireToken, code, platform]);

  useEffect(() => {
    if (tokens) {
      dispatch(updateAuth(tokens));
      queryMe();
    }
  }, [dispatch, queryMe, tokens]);

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

      //FIXME: FOR DEBUGGING
      step = AuthStep.SkillInfo;

      dispatch(
        updateAuth({
          step,
          user: me,
        })
      );

      router.push('/');
    }
  }, [me, dispatch, router]);

  if (acquireTokenError || queryMeError) {
    const queryError = (acquireTokenError ?? queryMeError) as FetchBaseQueryError;
    return (
      <Txt size="typo4" weight="regular">
        {JSON.stringify(queryError.data)}
      </Txt>
    );
  }
  return <div>Loading</div>;
};
