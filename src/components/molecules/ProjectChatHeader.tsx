import React, { useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { mutate } from 'swr';

import { Button, Input, Txt } from '#/components/atoms';
import { useProjectMutator, useProjectsQuery } from '#/hooks/use-projects';
import { Project, ProjectStatus } from '#/types';

interface ProjectChatHeaderProps {
  projectId: Project['id'];
}

export const ProjectChatHeader: React.FC<ProjectChatHeaderProps> = ({ projectId }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');

  const { trigger: mutateProject, isMutating: isMutatingProject } = useProjectMutator(projectId);
  const { data: projects, mutate: mutateProjects } = useProjectsQuery();

  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);

  useEffect(() => {
    if (project?.name) {
      setEditedName(project?.name);
    }
  }, [project?.name]);

  return (
    <Container>
      <TextContainer>
        {editMode ? (
          <form
            ref={formRef}
            onBlur={() => setEditMode(false)}
            onSubmit={async (e) => {
              e.stopPropagation();
              e.preventDefault();

              const updatedProject = await mutateProject({ name: editedName });
              mutateProjects((projects) => [
                ...(projects?.filter((p) => p.id !== projectId) ?? []),
                updatedProject,
              ]);
              setEditMode(false);
            }}
          >
            <Input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={() => formRef.current?.submit()}
              disabled={isMutatingProject}
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <Txt
            size="typo3"
            weight="bold"
            color={project?.name ? '#212121' : '#bdbdbd'}
            onClick={() => setEditMode(true)}
          >
            {project?.name ?? '프로젝트 이름'}
          </Txt>
        )}
        <Txt size="typo5" weight="medium" color="#9e9e9e">
          {project?.createdAt} ~ {project?.completedAt}
        </Txt>
      </TextContainer>
      <Button
        variant="outlined"
        color="primary"
        height="30"
        onClick={() =>
          mutateProject({
            status: project?.completedAt
              ? ProjectStatus.PROJECT_IN_PROGRESS
              : ProjectStatus.PROJECT_COMPLETE,
          })
        }
        disabled={isMutatingProject}
      >
        <Txt size="typo6" weight="regular" style={{ whiteSpace: 'nowrap' }}>
          {project?.completedAt ? '프로젝트 진행하기' : '프로젝트 종료하기'}
        </Txt>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
