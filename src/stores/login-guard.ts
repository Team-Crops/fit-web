import { create } from 'zustand';

interface LoginGuardState {
  isShowLoginPopup: boolean;
}

interface LoginGuardAction {
  showLoginPopup: () => void;
  hideLoginPopup: () => void;
}

export const useLoginGuardStore = create<LoginGuardState & LoginGuardAction>((set) => ({
  isShowLoginPopup: false,
  showLoginPopup: () => set({ isShowLoginPopup: true }),
  hideLoginPopup: () => set({ isShowLoginPopup: false }),
}));
