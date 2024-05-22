'use client';

import { useMemo } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { ProjectDivider } from '#/components/molecules/ProjectDivider';
import { ProjectChatRoom } from '#/components/organisms/ProjectChatRoom';
import { useProjectsQuery } from '#/hooks/use-projects';
import { useAuthStore } from '#/stores';

const Container = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
`;

export const Projects: React.FC = () => {
  const nickname = useAuthStore((store) => store.user?.nickname);
  const { data: projects } = useProjectsQuery();

  const inProgressProjects = useMemo(() => projects?.filter((p) => !p.completedAt), [projects]);
  const completedProjects = useMemo(() => projects?.filter((p) => p.completedAt), [projects]);

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        프로젝트 모음
      </Txt>
      <Txt size="typo5" weight="regular" color="#9e9e9e">
        {nickname} 님의 프로젝트를 효과적으로 관리하고, 참여하세요!
      </Txt>
      <ProjectDivider />
      {inProgressProjects?.map((project) => (
        <ProjectChatRoom key={project.id} projectId={project.id} />
      ))}
      <ProjectDivider done />
      {completedProjects?.map((project) => (
        <ProjectChatRoom key={project.id} projectId={project.id} />
      ))}
    </Container>
  );
};
