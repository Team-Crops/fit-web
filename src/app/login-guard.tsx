'use client';

import { useCallback, useEffect } from 'react';

import { Login } from '#/components/templates/Login';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';

interface LoginGuardProps {
  children: React.ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const dispatch = useAppDispatch();

  const showLoginPopup = useAppSelector((state) => state.auth.showLoginPopup);
  const authStep = useAppSelector((state) => state.auth.step);

  useEffect(() => {
    if (authStep !== AuthStep.Complete) {
      dispatch(updateAuth({ showLoginPopup: authStep !== null }));
    }
  }, [authStep, dispatch]);

  const onCancleLogin = useCallback(() => {
    dispatch(updateAuth({ showLoginPopup: false }));
  }, [dispatch]);

  return (
    <>
      {children}
      {showLoginPopup && <Login onCancel={onCancleLogin} />}
    </>
  );
}
