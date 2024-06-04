'use client';

import Link from 'next/link';

import { ApiErrorCode } from '#/entities/api-error';
import { useMeQuery } from '#/hooks/use-user';
import { useLoginGuardStore } from '#/stores';

export const GuardedLink = (props: Parameters<typeof Link>[0]) => {
  const showLoginPopup = useLoginGuardStore((state) => state.showLoginPopup);

  const { error } = useMeQuery();

  if (error && error.code === ApiErrorCode.INVALID_ACCESS_TOKEN) {
    return <span {...props} onClick={() => showLoginPopup()} />;
  }
  return <Link {...props} />;
};
