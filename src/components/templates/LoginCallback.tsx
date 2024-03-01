'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';

import styled from '@emotion/styled';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { SocialPlatform } from '#/entities/socialPlatform';
import { useLazyAcquireTokenQuery } from '#/redux/features/auth/api';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useLazyMeQuery, useLazyMyAgreementsQuery } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  background-color: #eeeeee;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

interface LoginCallbackProps {
  platform: SocialPlatform;
}

export const LoginCallback = ({ platform }: LoginCallbackProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [acquireToken, { data: tokens, error: acquireTokenError }] = useLazyAcquireTokenQuery();
  const [queryMe, { data: me, error: queryMeError }] = useLazyMeQuery();
  const [queryAgreements, { data: myAgreements }] = useLazyMyAgreementsQuery();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      acquireToken({ platform, code });
    } else {
      console.log(code);
      notFound();
    }
  }, [acquireToken, code, platform]);

  useEffect(() => {
    if (tokens) {
      dispatch(updateAuth(tokens));
      queryMe();
      queryAgreements();
    }
  }, [dispatch, queryAgreements, queryMe, tokens]);

  useEffect(() => {
    if (me && myAgreements) {
      let step: AuthStep;
      if (myAgreements.some((policy) => policy.isAgree === false)) {
        step = AuthStep.Policies;
      } else if (!me.nickname) {
        step = AuthStep.UserInfo;
      } else if (!me.positionId) {
        step = AuthStep.PositionInfo;
      } else if (!me.username || !me.email) {
        step = AuthStep.PersonalInfo;
      } else if (!me.projectCount || !me.regionId || !me.activityHour) {
        step = AuthStep.ActivityInfo;
      } else if (!me.skillIdList) {
        step = AuthStep.SkillInfo;
      } else {
        step = AuthStep.Complete;
      }

      step = AuthStep.ActivityInfo;

      dispatch(
        updateAuth({
          step,
          user: me,
        })
      );

      router.push('/');
    }
  }, [me, dispatch, router, myAgreements]);

  if (acquireTokenError || queryMeError) {
    const queryError = (acquireTokenError ?? queryMeError) as FetchBaseQueryError;
    return (
      <>
        <h1>{queryError.status}</h1>
        <Txt size="typo4" weight="regular">
          {JSON.stringify(queryError.data)}
        </Txt>
      </>
    );
  }
  return (
    <Container>
      <Txt size="typo2" weight="bold">
        로그인 중입니다
      </Txt>
      <Txt size="typo4" weight="medium">
        F-IT, 프로젝트 시작을 위한 최적의 팀원 매칭 및 추천 서비스
      </Txt>
    </Container>
  );
};
