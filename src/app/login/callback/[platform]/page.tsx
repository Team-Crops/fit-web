import { notFound } from 'next/navigation';

import { LoginCallback } from '#/components/templates/LoginCallback';
import { SocialPlatform } from '#/types/social-platform';

interface PathParams {
  platform: string;
}

export default function LoginCallbackPage({ params }: { params: PathParams }) {
  const { platform } = params;

  if (platform !== 'kakao' && platform !== 'google') {
    return notFound();
  }

  return (
    <main>
      <LoginCallback platform={platform as SocialPlatform} />
    </main>
  );
}
