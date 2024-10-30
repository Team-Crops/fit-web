import returnFetch from 'return-fetch';

import { ApiError } from '#/types';
import { getTokens } from '#/utilities/session';

export const fitFetch = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: async ([path, init = {}]) => {
      const tokens = getTokens();
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
  const toastExclusionCodes = [
    ApiError.INVALID_ACCESS_TOKEN_CODE,
    ApiError.MATCHING_NOT_FOUND_CODE,
  ];

  const res = await fitFetch(...args);
  try {
    const json = await res.json();
    if (!res.ok && json.message && !toastExclusionCodes.includes(json.code)) {
      // toast.error(json.message);
    }
    return res.ok ? (json as T) : Promise.reject(json as Error);
  } catch (error) {
    return res.ok ? (null as T) : Promise.reject(error as Error);
  }
};
