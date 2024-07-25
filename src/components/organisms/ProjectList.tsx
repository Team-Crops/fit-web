import { useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { ProjectDivider } from '#/components/molecules/ProjectDivider';
import { ProjectChatRoom } from '#/components/organisms/ProjectChatRoom';
import { useProjectsQuery } from '#/hooks/use-projects';
import { Project } from '#/types';

export const ProjectList = ({
  unfoldedProjectIds: defaultUnfoldeds,
}: {
  unfoldedProjectIds: Project['id'][];
}) => {
  const [unfoldedProjectIds, setUnfoldedProjectIds] = useState<Project['id'][]>(defaultUnfoldeds);

  const toggleFold = useMemo(
    () => (pid: Project['id']) => {
      setUnfoldedProjectIds((prev) =>
        prev.includes(pid) ? prev.filter((id) => id !== pid) : [...prev, pid]
      );
    },
    [setUnfoldedProjectIds]
  );

  const { data: projects } = useProjectsQuery();

  const inProgressProjects = useMemo(() => projects?.filter((p) => !p.completedAt), [projects]);
  const completedProjects = useMemo(() => projects?.filter((p) => p.completedAt), [projects]);

  return (
    <Container>
      {inProgressProjects?.length ? <ProjectDivider /> : null}
      {inProgressProjects?.map((project) => (
        <ProjectChatRoom
          key={project.id}
          projectId={project.id}
          isFolded={!unfoldedProjectIds.includes(project.id)}
          toggleFold={() => toggleFold(project.id)}
        />
      ))}
      {completedProjects?.length ? <ProjectDivider done /> : null}
      {completedProjects?.map((project) => (
        <ProjectChatRoom
          key={project.id}
          projectId={project.id}
          isFolded={!unfoldedProjectIds.includes(project.id)}
          toggleFold={() => toggleFold(project.id)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
