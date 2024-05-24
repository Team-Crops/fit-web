import { useAuthStore } from '#/stores/auth';
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
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKENS_KEY);
  }
}

export function useGetTokens() {
  const tokens = useAuthStore((state) => state.tokens);
  return getTokens() ?? tokens;
}
