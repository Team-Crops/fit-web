import { create } from 'zustand';

import { SignUpStep } from '#/types/sign-up-step';

interface SignUpState {
  step: SignUpStep | null;
  onForward: (() => boolean | Promise<boolean>) | null;
}

interface SignUpAction {
  setStep: (step: SignUpStep | null) => void;
  setOnForward: (onForward: (() => boolean | Promise<boolean>) | null) => void;
}

export const useSignUpStore = create<SignUpState & SignUpAction>()((set) => ({
  step: null,
  onForward: null,

  setStep: (step) => set(() => ({ step })),
  setOnForward: (onForward) => set(() => ({ onForward })),
}));
