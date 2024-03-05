'use client';

import { useEffect } from 'react';

import { Login } from '#/components/templates/Login';
import { updateAuth } from '#/redux/features/auth/slice';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';

interface LoginGuardProps {
  children: React.ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const dispatch = useAppDispatch();

  const signupStatus = useAppSelector((state) => state.user.me?.status);
  const showLoginPopup = useAppSelector((state) => state.auth.showLoginPopup);

  useEffect(() => {
    if (signupStatus === 'INCOMPLETE') {
      dispatch(updateAuth({ showLoginPopup: true }));
    }
  }, [dispatch, signupStatus]);

  return (
    <>
      {children}
      {showLoginPopup && <Login />}
    </>
  );
}
