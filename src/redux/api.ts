import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dev-api.f-it.team/v1',
  }),
  endpoints: () => ({}),
});
