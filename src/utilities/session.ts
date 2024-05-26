import { AuthTokens } from '#/types/auth-tokens';

const TOKENS_KEY = 'api-token';

export function getTokens(): AuthTokens | null {
  const tokens = localStorage.getItem(TOKENS_KEY);
  if (tokens) {
    return JSON.parse(tokens);
  }
  return null;
}

export function setTokens(tokens: AuthTokens | null) {
  if (tokens) {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKENS_KEY);
  }
}
