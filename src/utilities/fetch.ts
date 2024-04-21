import returnFetch from 'return-fetch';

import { getTokens } from '#/utilities/session';

export const fitFetch = returnFetch({
  baseUrl: 'http://dev-api.f-it.team',
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: async ([path, init = {}]) => {
      let tokens = getTokens();
      if (tokens) {
        const headers = new Headers(init.headers);
        headers.set('Authorization', `Bearer ${tokens.accessToken}`);
        init.headers = headers;
      }
      return [path, init];
    },
  },
});

export const fitFetcher = async <T>(...args: Parameters<typeof fitFetch>) => {
  const res = await fitFetch(...args);
  const json = await res.json();
  return res.ok ? (json as T) : Promise.reject(json as Error);
};
