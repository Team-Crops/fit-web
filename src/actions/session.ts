'use server';

import { cookies } from 'next/headers';

// import jwt from 'jsonwebtoken';

import { AuthTokens } from '#/types/auth-tokens';
// import { fitFetch } from '../utilities/fetch';

const SESSION_KEY = 'session';

// async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
//   const response = await fitFetch('/v1/auth/refresh', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ refreshToken }),
//   });
//   const json = await response.json();
//   return json;
// }

// function checkTokenExpiration(token: string): boolean {
//   try {
//     const decoded = jwt.decode(token) as { exp: number };
//     return decoded.exp * 1000 > Date.now() + 60 * 1000; // 60 second buffer
//   } catch {
//     return false;
//   }
// }

export async function getToken(): Promise<string | null> {
  const sessionData = cookies().get(SESSION_KEY)?.value;
  if (!sessionData) {
    return null;
  }

  try {
    const { accessToken, refreshToken } = JSON.parse(atob(sessionData));
    // if (checkTokenExpiration(accessToken)) {
    //   const newTokens = await refreshTokens(refreshToken);
    //   setTokens(newTokens);
    //   return newTokens.accessToken;
    // }
    return accessToken;
  } catch {
    return null;
  }
}

export async function setTokens(tokens: AuthTokens | null) {
  if (!tokens) {
    cookies().delete(SESSION_KEY);
    return;
  }

  const sessionData = btoa(JSON.stringify(tokens));
  cookies().set(SESSION_KEY, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}
