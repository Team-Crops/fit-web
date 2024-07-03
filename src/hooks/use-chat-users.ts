import { useMemo } from 'react';

import { ChatUser, Matching, Project } from '#/types';
import { useMatchingRoomQuery, useProjectsQuery } from '.';

export function useChatUsers({
  projectId,
  matchingId,
}: {
  projectId?: Project['id'];
  matchingId?: Matching['id'];
}) {
  const { data: matching } = useMatchingRoomQuery(matchingId);
  const { data: projects } = useProjectsQuery();

  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);
  const users: ChatUser[] = useMemo(
    () => project?.members ?? matching?.matchingUsers ?? [],
    [matching?.matchingUsers, project?.members]
  );

  return users;
}
