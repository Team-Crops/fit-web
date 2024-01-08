import { configureStore } from '@reduxjs/toolkit';

import accessTokenReducer from './slices/access-token-slice';

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
});
