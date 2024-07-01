import { useMemo } from 'react';

import { Matching, Project } from '#/types';
import { useMatchingRoomQuery, useProjectsQuery } from '.';

export function useChatId({
  projectId,
  matchingId,
}: {
  projectId?: Project['id'];
  matchingId?: Matching['id'];
}) {
  const { data: matching } = useMatchingRoomQuery(matchingId);
  const { data: projects } = useProjectsQuery();

  const project = useMemo(() => projects?.find((p) => p.id === projectId), [projects, projectId]);
  const chatId = useMemo(
    () => project?.chatId ?? matching?.chatId,
    [matching?.chatId, project?.chatId]
  );

  return chatId;
}
