'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';

import styled from '@emotion/styled';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { SocialPlatform } from '#/entities/socialPlatform';
import { useLazyAcquireTokenQuery } from '#/redux/features/auth/api';
import { updateAuth } from '#/redux/features/auth/slice';
import { useAppDispatch } from '#/redux/hooks';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background-color: #eee;

  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

interface LoginCallbackProps {
  platform: SocialPlatform;
}

export const LoginCallback = ({ platform }: LoginCallbackProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [acquireToken, { data: tokens, error: acquireTokenError }] = useLazyAcquireTokenQuery();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

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
      router.push('/');
    }
  }, [dispatch, router, tokens]);

  if (acquireTokenError) {
    const queryError = acquireTokenError as FetchBaseQueryError;
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
