import { create } from 'zustand';

import { AuthTokens } from '#/types';
import { User } from '#/types/user';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  policyAgreed: boolean | null;
}

interface AuthAction {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setPolicyAgreed: (policyAgreed: boolean) => void;

  set: (state: Partial<AuthState>) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  tokens: null,
  policyAgreed: null,

  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  setPolicyAgreed: (policyAgreed) => set({ policyAgreed }),

  set: (state) => set(state),
  clear: () => set({ user: null, tokens: null, policyAgreed: null }),
}));
