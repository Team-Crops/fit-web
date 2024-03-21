import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import authReducer from './features/auth/slice';
import matchingReducer from './features/matching/slice';
import userReducer from './features/user/slice';

export function makeStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      matching: matchingReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
