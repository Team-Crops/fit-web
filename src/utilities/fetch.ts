import returnFetch from 'return-fetch';

export const fitFetch = returnFetch({
  baseUrl: 'https://54.180.113.74:8080/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: async ([url, request]) => {
      const requestWithAuth = {
        ...request,
        headers: {
          ...request?.headers,
          Authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjMxNjkxNzAxOTIsImV4cCI6MTczMjUxNzMyMH0.6J6nqi7UDzU4dPQSjfPev4cpDfGkYIOfsiS-LdF4KVgZfBB2Q_GJXQILL4sVR0s-',
        },
      };
      return [url, requestWithAuth];
    },
  },
});
