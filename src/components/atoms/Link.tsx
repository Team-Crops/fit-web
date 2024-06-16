'use client';

import Link from 'next/link';

import { useMeQuery } from '#/hooks/use-user';
import { useLoginGuardStore } from '#/stores';
import { ApiError } from '#/types';

export const GuardedLink = (props: Parameters<typeof Link>[0]) => {
  const showLoginPopup = useLoginGuardStore((state) => state.showLoginPopup);

  const { error } = useMeQuery();

  if (error && error.code === ApiError.INVALID_ACCESS_TOKEN_CODE) {
    return <span {...props} onClick={() => showLoginPopup()} />;
  }
  return <Link {...props} />;
};
