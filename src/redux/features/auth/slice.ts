import { createSlice } from '@reduxjs/toolkit';

import type { User, Tokens } from 'src/entities/user';

type AuthState = {
  user: User | null;
  tokens: Tokens | null;
};

const initialState: AuthState = {
  user: null,
  tokens: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
  },
});

export const { setUser, setTokens } = authSlice.actions;
export default authSlice.reducer;
