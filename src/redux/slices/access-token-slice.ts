import { createSlice } from '@reduxjs/toolkit';

interface AccessTokenState {
  value: string | null;
}

const initialState: AccessTokenState = {
  value: null,
};

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = null;
    },
  },
});

export const { set, clear } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
