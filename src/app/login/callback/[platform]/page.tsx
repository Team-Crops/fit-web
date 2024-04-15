import { notFound } from 'next/navigation';

import { SignInCallback } from '#/components/templates/SignInCallback';
import { SocialPlatform } from '#/entities/socialPlatform';

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
      <SignInCallback platform={platform as SocialPlatform} />
    </main>
  );
}
