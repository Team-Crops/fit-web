'use server';

import { SocialPlatform } from '#/entities/socialPlatform';

interface GetLoginPageResponse {
  loginPageUrl: string;
}

export async function getLoginPage(platform: SocialPlatform): Promise<string> {
  const response = await fetch(`/v1/auth/social/${platform}/login-page`);
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

export async function acquireToken({
  platform,
  code,
}: AcquireTokenProps): Promise<AcquireTokenResponse> {
  const response = await fetch(`/v1/auth/social/${platform}/login`, {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  const json = (await response.json()) as AcquireTokenResponse;
  return json;
}
