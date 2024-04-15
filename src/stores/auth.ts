import { create } from 'zustand';

import { User } from '#/types/user';

interface AuthState {
  user: User | null;
}

interface AuthAction {
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  user: null,

  setUser: (user) => set(() => ({ user })),
}));
