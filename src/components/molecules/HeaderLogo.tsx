import Link from 'next/link';

import { FitLogo } from '#/components/atoms';

export const HeaderLogo = () => {
  return (
    <Link href={'/'}>
      <FitLogo />
    </Link>
  );
};
