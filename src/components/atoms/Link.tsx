'use client';

import Link from 'next/link';

import { useMeQuery } from '#/hooks/use-user';
import { useLoginGuardStore } from '#/stores';

export const GuardedLink = (props: Parameters<typeof Link>[0]) => {
  const showLoginPopup = useLoginGuardStore((state) => state.showLoginPopup);

  const { data: me } = useMeQuery();

  if (me) {
    return <Link {...props} />;
  }
  return <span {...props} onClick={() => showLoginPopup()} />;
};
