import { LoginServer } from 'src/entities/loginServer';

import { api } from '../../api';

export interface LoginPageResponse {
  loginPageUrl: string;
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginPage: build.query<LoginPageResponse, LoginServer>({
      query: (loginServer) => ({
        url: `/auth/social/${loginServer}/login-page`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginPageQuery, useLazyLoginPageQuery } = authApi;
export default authApi;
