import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '#/entities/user';

type UserState = {
  me: User | null;
};

const initialState: UserState = {
  me: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<User | null>) {
      return { ...state, me: action.payload };
    },
    updateMe(state, action: PayloadAction<Partial<Omit<User, 'id'>>>) {
      if (!state.me) {
        return state;
      }
      return { ...state, me: { ...state.me, ...action.payload, id: state.me.id } };
    },
  },
});

export const { setMe, updateMe } = userSlice.actions;
export default userSlice.reducer;
