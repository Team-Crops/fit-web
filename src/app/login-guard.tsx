'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Loading } from '#/components/atoms';
import { LoginPopup } from '#/components/templates/LoginPopup';
import { useMeQuery } from '#/hooks/use-user';
import { useLoginGuardStore } from '#/stores';
import { ApiError } from '#/types';

interface LoginGuardProps {
  children?: React.ReactNode;
}

export const LoginGuard = ({ children }: LoginGuardProps) => {
  const router = useRouter();
  const { isLoading, error } = useMeQuery();
  const showLoginPopup = useLoginGuardStore((state) => state.showLoginPopup);

  useEffect(() => {
    if (error && error.code === ApiError.INVALID_ACCESS_TOKEN_CODE) {
      router.push('/');
      showLoginPopup();
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error && error.code === ApiError.INVALID_ACCESS_TOKEN_CODE && <LoginPopup />}
      {children}
    </>
  );
};
