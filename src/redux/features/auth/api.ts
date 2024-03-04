import { SocialPlatform } from '#/entities/socialPlatform';
import { api } from '#/redux/api';

export interface LoginPageResponse {
  loginPageUrl: string;
}

export interface AcquireTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AcquireTokenProps {
  platform: SocialPlatform;
  code: string;
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginPage: build.query<LoginPageResponse, SocialPlatform>({
      query: (platform) => ({
        url: `/v1/auth/social/${platform}/login-page`,
        method: 'GET',
      }),
    }),
    acquireToken: build.query<AcquireTokenResponse, AcquireTokenProps>({
      query: ({ platform, code }) => ({
        url: `/v1/auth/social/${platform}/login`,
        method: 'POST',
        body: { code },
      }),
    }),
  }),
});

export const {
  useLoginPageQuery,
  useLazyLoginPageQuery,
  useAcquireTokenQuery,
  useLazyAcquireTokenQuery,
} = authApi;
export default authApi;
