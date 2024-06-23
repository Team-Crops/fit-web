import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms';
import { ProjectSummary } from '#/components/molecules/ProjectSummary';
import { Project } from '#/types';
import { transientStyled, transientOptions } from '#/utilities/transient-styled';
import { ChatRoom } from './ChatRoom';

interface ProjectChatRoomProps {
  projectId: Project['id'];
}

export const ProjectChatRoom = ({ projectId }: ProjectChatRoomProps) => {
  const [isFolded, setIsFolded] = useState(true);

  return (
    <Container $isFolded={isFolded}>
      {isFolded && <ProjectSummary projectId={projectId} />}
      {!isFolded && <ChatRoom projectId={projectId} />}
      <FoldIcon
        $isFolded={isFolded}
        icon="arrowDown"
        size={28}
        onClick={() => setIsFolded((v) => !v)}
      />
    </Container>
  );
};

const Container = styled('div', transientOptions)<{ $isFolded: boolean }>`
  position: relative;

  background: #fff;
  border: 1px solid #ff908d;
  border-width: ${({ $isFolded }) => ($isFolded ? '1px' : 0)};
  border-radius: 11px;

  transition: height 0.3s;
`;

const FoldIcon = transientStyled(Icons)<{
  $isFolded: boolean;
}>`
  position: absolute;
  top: 30px;
  left: 16px;

  transform: ${({ $isFolded }) => ($isFolded ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.3s;

  cursor: pointer;
`;
