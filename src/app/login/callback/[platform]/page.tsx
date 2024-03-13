import { LoginCallback } from '#/components/templates/LoginCallback';
import { SocialPlatform } from '#/entities/socialPlatform';

interface PathParams {
  platform: string;
}

export default function LoginCallbackPage({ params }: { params: PathParams }) {
  const { platform } = params;

  if (platform === 'kakao' || platform === 'google') {
    return (
      <main>
        <LoginCallback platform={platform as SocialPlatform} />
      </main>
    );
  }
}
