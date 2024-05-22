import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useProject } from '#/stores';
import { Project } from '#/types';

interface ProjectSummaryProps {
  projectId: Project['id'];
}

export const ProjectSummary = ({ projectId }: ProjectSummaryProps) => {
  const project = useProject(projectId);
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
