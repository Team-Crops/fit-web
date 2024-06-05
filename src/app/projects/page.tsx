import { LoginGuard } from '#/app/login-guard';
import { Projects } from '#/components/templates/Projects';

export default function ProjectsPage() {
  return (
    <LoginGuard>
      <Projects />
    </LoginGuard>
  );
}
