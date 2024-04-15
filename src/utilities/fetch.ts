import returnFetch from 'return-fetch';

import { getToken } from '#/actions/session';

export const fitFetch = returnFetch({
  baseUrl: 'http://dev-api.f-it.team',
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: async ([url, options]) => {
      const token = await getToken();
      if (token && options?.headers) {
        (options.headers as Headers).append('Authorization', `Bearer ${token}`);
      }
      return [url, options];
    },
  },
});
