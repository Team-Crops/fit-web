'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';

import styled from '@emotion/styled';

import { mutate } from 'swr';

import { ME_QUERY_KEY } from '#/hooks/use-user';
import { AuthTokens } from '#/types/auth-tokens';
import { SocialPlatform } from '#/types/social-platform';
import { fitFetch } from '#/utilities/fetch';
import { setTokens as setStorageTokens } from '#/utilities/session';
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
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    notFound();
  }

  useEffect(() => {
    async function loadTokens() {
      if (code) {
        const tokens = await acquireTokens({ platform, code });
        setStorageTokens(tokens);
        mutate(ME_QUERY_KEY);
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

export async function acquireTokens({
  platform,
  code,
}: {
  platform: string;
  code: string;
}): Promise<AuthTokens> {
  const host = window.location.host;
  const response = await fitFetch(`/v1/auth/social/${platform}/login`, {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      Origin: `http://${host}`,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to acquire token: (${response.status}) ${JSON.stringify(json)}`);
  }

  return json as AuthTokens;
}
