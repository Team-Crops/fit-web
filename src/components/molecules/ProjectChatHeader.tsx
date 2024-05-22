import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Button, Input, Txt } from '#/components/atoms';
import { useProjectMutator } from '#/hooks/use-projects';
import { useProject } from '#/stores';
import { Project, ProjectStatus } from '#/types';

interface ProjectChatHeaderProps {
  projectId: Project['id'];
}

export const ProjectChatHeader: React.FC<ProjectChatHeaderProps> = ({ projectId }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');

  const { data: project } = useProject(projectId);

  const { trigger: mutateProject, isMutating: isMutatingProject } = useProjectMutator(projectId);

  return (
    <Container>
      <TextContainer>
        {editMode ? (
          <Txt
            size="typo3"
            weight="bold"
            color={project?.name ? '#212121' : '#bdbdbd'}
            onClick={() => setEditMode(true)}
          >
            {project?.name ?? '프로젝트 이름'}
          </Txt>
        ) : (
          <form
            ref={formRef}
            action={async () => {
              await mutateProject({ name: editedName });
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
        {project?.completedAt ? '프로젝트 진행하기' : '프로젝트 종료하기'}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
