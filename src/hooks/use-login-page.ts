import useSWR from 'swr';

import { SocialPlatform } from '#/types/social-platform';
import { fitFetcher } from '#/utilities/fetch';

const LOGIN_PAGE_QUERY_KEY = (platform: SocialPlatform) => `/v1/auth/social/${platform}/login-page`;

interface LoginPageQueryResponse {
  loginPageUrl: string;
}

export function useLoginPageQuery(platform: SocialPlatform) {
  const { data, ...others } = useSWR<LoginPageQueryResponse>(
    LOGIN_PAGE_QUERY_KEY(platform),
    fitFetcher,
    {}
  );
  return {
    data: data?.loginPageUrl,
    ...others,
  };
}
