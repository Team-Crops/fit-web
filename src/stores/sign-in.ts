import { create } from 'zustand';

interface SignInState {
  isPopupOpened: boolean;
}

interface SignInAction {
  openPopup: () => void;
  closePopup: () => void;
}

export const useSignInStore = create<SignInState & SignInAction>((set) => ({
  isPopupOpened: false,

  openPopup: () => set({ isPopupOpened: true }),
  closePopup: () => set({ isPopupOpened: false }),
}));
