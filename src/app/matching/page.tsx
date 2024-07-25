import { LoginGuard } from '#/app/login-guard';
import { Matching } from '#/components/templates/Matching';

export default function MatchingPage() {
  return (
    <LoginGuard>
      <Matching />
    </LoginGuard>
  );
}
