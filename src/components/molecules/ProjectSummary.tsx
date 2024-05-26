import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useProjectsQuery } from '#/hooks/use-projects';
import { Project } from '#/types';

interface ProjectSummaryProps {
  projectId: Project['id'];
}

export const ProjectSummary = ({ projectId }: ProjectSummaryProps) => {
  const { data: projects } = useProjectsQuery();

  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);

  return (
    <Container>
      <Txt>{project?.name}</Txt>
      <Txt>
        {project?.createdAt} ~ {project?.completedAt}
      </Txt>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
