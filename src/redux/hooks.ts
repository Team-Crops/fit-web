import { useDispatch, useSelector, useStore } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from 'src/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const useMe = () => {
  return useAppSelector((state) => state.auth.user);
};
