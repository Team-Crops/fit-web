'use client';

import { useRouter } from 'next/navigation';

import { Loading } from '#/components/atoms';
import { LoginPopup } from '#/components/templates/LoginPopup';
import { ApiErrorCode } from '#/entities/api-error';
import { useMeQuery } from '#/hooks/use-user';
import { useLoginGuardStore } from '#/stores';

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

  if (error && error.code === ApiErrorCode.INVALID_ACCESS_TOKEN) {
    showLoginPopup();
    router.back();
  }

  return (
    <>
      {error && error.code === ApiErrorCode.INVALID_ACCESS_TOKEN && <LoginPopup />}
      {children}
    </>
  );
};
