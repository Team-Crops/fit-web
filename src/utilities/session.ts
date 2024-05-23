import { AuthTokens } from '#/types/auth-tokens';

const TOKENS_KEY = 'api-token';

export function getTokens(): AuthTokens | null {
  const tokens = typeof window !== 'undefined' ? sessionStorage.getItem(TOKENS_KEY) : null;
  if (tokens) {
    return JSON.parse(tokens);
  }
  return null;
}

export function setTokens(tokens: AuthTokens | null) {
  if (tokens) {
    sessionStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    sessionStorage.removeItem(TOKENS_KEY);
  }
}
