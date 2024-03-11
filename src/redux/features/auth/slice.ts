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
      const { accessToken, refreshToken } = action.payload;
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return { ...state, ...action.payload };
    },
    deleteAuth() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return initialState;
    },
  },
});

export const { updateAuth, deleteAuth } = authSlice.actions;
export default authSlice.reducer;
