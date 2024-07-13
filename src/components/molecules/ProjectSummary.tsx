import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useProjectsQuery } from '#/hooks/use-projects';
import { Project } from '#/types';
import { formatDateTime } from '#/utilities/format-date-time';

interface ProjectSummaryProps {
  projectId: Project['id'];
}

export const ProjectSummary = ({ projectId }: ProjectSummaryProps) => {
  const { data: projects } = useProjectsQuery();

  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);
  const createdAt = useMemo(
    () =>
      project?.createdAt
        ? formatDateTime(project.createdAt, { year: true, month: true, day: true })
        : null,
    [project?.createdAt]
  );
  const completedAt = useMemo(
    () => (project?.completedAt ? formatDateTime(project.completedAt) : null),
    [project?.completedAt]
  );

  return (
    <Container>
      <Txt size="typo2" weight="bold">
        {project?.name}
      </Txt>
      <Txt size="typo5" weight="medium" color="#9E9E9E">
        {createdAt} ~ {completedAt}
      </Txt>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 60px 20px;
`;
