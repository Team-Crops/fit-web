import { LoginServer } from 'src/entities/loginServer';

import { api } from '#/redux/api';

export interface LoginPageResponse {
  loginPageUrl: string;
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginPage: build.query<LoginPageResponse, LoginServer>({
      query: (loginServer) => ({
        url: `/v1/auth/social/${loginServer}/login-page`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginPageQuery, useLazyLoginPageQuery } = authApi;
export default authApi;
