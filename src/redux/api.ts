import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { deleteAuth, updateAuth } from '#/redux/features/auth/slice';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://dev-api.f-it.team/',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    if (state.auth.accessToken) {
      headers.set('Authorization', `Bearer ${state.auth.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/v1/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };
      api.dispatch(updateAuth({ accessToken, refreshToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(deleteAuth());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
