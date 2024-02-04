import Link from 'next/link';

import { FitLogo } from '#atoms/FitLogo';

export const HeaderLogo = () => {
  return (
    <Link href={'/'}>
      <FitLogo width={118} height={38} />
    </Link>
  );
};
