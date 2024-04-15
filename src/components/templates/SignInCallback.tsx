'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';

import styled from '@emotion/styled';

import { acquireToken } from '#/actions/auth';
import { setTokens } from '#/actions/session';
import { SocialPlatform } from '#/entities/socialPlatform';
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

interface SignInCallbackProps {
  platform: SocialPlatform;
}

export const SignInCallback = ({ platform }: SignInCallbackProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    notFound();
  }

  useEffect(() => {
    async function loadTokens() {
      if (code) {
        const tokens = await acquireToken({ platform, code });
        await setTokens(tokens);
        router.replace('/');
      }
    }
    loadTokens();
  }, [code, platform, router]);

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
