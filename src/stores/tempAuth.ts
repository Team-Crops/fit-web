import { create } from 'zustand';

import { User } from '#/types';

interface TempAuthState {
  tempUser: User | null;
  tempProfileImage: File | null;
  tempPortfolioFile: File | null;
}

interface TempAuthAction {
  setTempUser: (user: User) => void;
  setTempProfileImage: (image: File) => void;
  setTempPortfolioFile: (file: File | null) => void;
  initTempAuth: () => void;
}

export const useTempAuthStore = create<TempAuthState & TempAuthAction>((set) => ({
  tempUser: null,
  tempProfileImage: null,
  tempPortfolioFile: null,

  setTempUser: (user) => set({ tempUser: user }),
  setTempProfileImage: (image) => set({ tempProfileImage: image }),
  setTempPortfolioFile: (file) => set({ tempPortfolioFile: file }),
  initTempAuth: () => set({ tempUser: null, tempProfileImage: null, tempPortfolioFile: null }),
}));
