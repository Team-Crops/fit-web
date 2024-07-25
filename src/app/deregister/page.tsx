import { LoginGuard } from '#/app/login-guard';
import { DeregisterSection } from '#/components/templates/Deregister/DeregisterSection';

export default function DeregisterPage() {
  return (
    <LoginGuard>
      <DeregisterSection />
    </LoginGuard>
  );
}
