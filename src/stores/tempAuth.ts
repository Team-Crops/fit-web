import { create } from 'zustand';

import { Me } from '#/types';

interface TempAuthState {
  tempUser: Me | null;
  tempProfileImage: File | null;
  tempPortfolioFile: File | null;
}

interface TempAuthAction {
  setTempUser: (user: Me) => void;
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
