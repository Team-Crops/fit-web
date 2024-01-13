import Link from 'next/link';

import { FitLogo } from '#atoms/FitLogo';

export const HeaderLogo = () => {
  return (
    <Link href={'/'}>
      <FitLogo width={119} />
    </Link>
  );
};
