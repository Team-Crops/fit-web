import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import authReducer from './services/auth/slice';

export function makeStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
