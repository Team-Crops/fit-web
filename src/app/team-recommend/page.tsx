import { LoginGuard } from '#/app/login-guard';
import { TeamRecommend } from '#/components/templates/TeamRecommend';

export default function TeamRecommendPage() {
  return (
    <LoginGuard>
      <TeamRecommend />
    </LoginGuard>
  );
}
