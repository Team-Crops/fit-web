'use client';

import styled from '@emotion/styled';

import { Loading, Txt } from '#/components/atoms';
import { EmptyProjectList } from '#/components/organisms/EmptyProjectList';
import { ProjectList } from '#/components/organisms/ProjectList';
import { useProjectsQuery } from '#/hooks/use-projects';
import { useMeQuery } from '#/hooks/use-user';

export const Projects: React.FC = () => {
  const { data: me } = useMeQuery();
  const { data: projects } = useProjectsQuery();

  if (!me) {
    return <Loading />;
  }
  return (
    <Container>
      <Txt size="typo1" weight="bold">
        프로젝트 모음
      </Txt>
      <Txt size="typo5" weight="regular" color="#9e9e9e">
        {me.nickname} 님의 프로젝트를 효과적으로 관리하고, 참여하세요!
      </Txt>
      {projects && projects?.length === 0 && <EmptyProjectList />}
      {projects && projects?.length > 0 && <ProjectList />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;
