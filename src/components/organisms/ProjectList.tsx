import { useMemo } from 'react';

import { ProjectDivider } from '#/components/molecules/ProjectDivider';
import { ProjectChatRoom } from '#/components/organisms/ProjectChatRoom';
import { useProjectsQuery } from '#/hooks/use-projects';

export const ProjectList = () => {
  const { data: projects } = useProjectsQuery();

  const inProgressProjects = useMemo(() => projects?.filter((p) => !p.completedAt), [projects]);
  const completedProjects = useMemo(() => projects?.filter((p) => p.completedAt), [projects]);
  return (
    <>
      <ProjectDivider />
      {inProgressProjects?.map((project) => (
        <ProjectChatRoom key={project.id} projectId={project.id} />
      ))}
      <ProjectDivider done />
      {completedProjects?.map((project) => (
        <ProjectChatRoom key={project.id} projectId={project.id} />
      ))}
    </>
  );
};
