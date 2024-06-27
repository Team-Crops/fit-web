'use client';

import { useSearchParams } from 'next/navigation';

import { LoginGuard } from '#/app/login-guard';
import { Projects } from '#/components/templates/Projects';

export default function ProjectsPage() {
  const searchParams = useSearchParams();

  const idsParam = searchParams.get('ids');
  const projectIds = idsParam?.split('.').map((id) => parseInt(id));

  return (
    <LoginGuard>
      <Projects unfoldedProjectIds={projectIds} />
    </LoginGuard>
  );
}
