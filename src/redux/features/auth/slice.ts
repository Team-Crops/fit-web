import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum AuthStep {
  Entrance,
  Policies,
  UserInfo,
  PositionInfo,
  PersonalInfo,
  ActivityInfo,
  SkillInfo,
  Complete,
}

type AuthState = {
  step: AuthStep | null;
  showLoginPopup: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  showLoginPopup: false,
  step: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth(state, action: PayloadAction<Partial<AuthState>>) {
      return { ...state, ...action.payload };
    },
    deleteAuth() {
      return initialState;
    },
  },
});

export const { updateAuth, deleteAuth } = authSlice.actions;
export default authSlice.reducer;
