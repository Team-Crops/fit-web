import useSWR from 'swr';

import { SocialPlatform } from '#/types/social-platform';
import { fitFetcher } from '#/utilities/fetch';

const LOGIN_PAGE_QUERY_KEY = (platform: SocialPlatform) => `/v1/auth/social/${platform}/login-page`;

interface LoginPageQueryResponse {
  loginPageUrl: string;
}

export function useLoginPageQuery(platform: SocialPlatform) {
  return useSWR(LOGIN_PAGE_QUERY_KEY(platform), async (url) => {
    const response = await fitFetcher<LoginPageQueryResponse>(url);
    return response.loginPageUrl;
  });
}
