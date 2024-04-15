'use server';

import { headers } from 'next/headers';

import { SocialPlatform } from '#/entities/socialPlatform';
import { AuthTokens } from '#/types/auth-tokens';
import { fitFetch } from '#/utilities/fetch';

interface GetLoginPageResponse {
  loginPageUrl: string;
}

export async function getLoginPage(platform: SocialPlatform): Promise<string> {
  const host = headers().get('host');
  const response = await fitFetch(`/v1/auth/social/${platform}/login-page`, {
    headers: {
      Origin: `http://${host}`,
    },
  });
  const json = (await response.json()) as GetLoginPageResponse;
  return json.loginPageUrl;
}

interface AcquireTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface AcquireTokenProps {
  platform: SocialPlatform;
  code: string;
}

export async function acquireToken({ platform, code }: AcquireTokenProps): Promise<AuthTokens> {
  const host = headers().get('host');
  const response = await fitFetch(`/v1/auth/social/${platform}/login`, {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      Origin: `http://${host}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to acquire token: (${response.status}) ${JSON.stringify(await response.json())}`
    );
  }

  const json = (await response.json()) as AcquireTokenResponse;
  return {
    accessToken: json.accessToken,
    refreshToken: json.refreshToken,
  } satisfies AuthTokens;
}
