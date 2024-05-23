import { create } from 'zustand';

import { User } from '#/types/user';

interface AuthState {
  user: User | null;
  policyAgreed: boolean | null;
}

interface AuthAction {
  setUser: (user: User) => void;
  clearUser: () => void;
  setPolicyAgreed: (policyAgreed: boolean) => void;
  clearPolicyAgreed: () => void;

  set: (state: Partial<AuthState>) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  policyAgreed: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setPolicyAgreed: (policyAgreed) => set({ policyAgreed }),
  clearPolicyAgreed: () => set({ policyAgreed: null }),

  set: (state) => set(state),
}));

export const useUser = () => useAuthStore((store) => store.user);
