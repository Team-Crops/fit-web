'use client';

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

  if (isLoading) {
    return <Loading />;
  }

  if (error && error.code === ApiError.INVALID_ACCESS_TOKEN_CODE) {
    showLoginPopup();
    router.back();
  }

  return (
    <>
      {error && error.code === ApiError.INVALID_ACCESS_TOKEN_CODE && <LoginPopup />}
      {children}
    </>
  );
};
